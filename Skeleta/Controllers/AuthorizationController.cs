﻿using AspNet.Security.OpenIdConnect.Extensions;
using AspNet.Security.OpenIdConnect.Primitives;
using DAL.Core;
using DAL.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using OpenIddict.Abstractions;
using OpenIddict.Server;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;


// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860


namespace Skeleta.Controllers
{
	public class AuthorizationController : Controller
	{
		private readonly IOptions<IdentityOptions> _identityOptions;
		private readonly SignInManager<ApplicationUser> _signInManager;
		private readonly UserManager<ApplicationUser> _userManager;

		public AuthorizationController(
			IOptions<IdentityOptions> identityOptions,
			SignInManager<ApplicationUser> signInManager,
			UserManager<ApplicationUser> userManager)
		{
			_identityOptions = identityOptions;
			_signInManager = signInManager;
			_userManager = userManager;
		}


		[HttpPost("~/connect/token")]
		[Produces("application/json")]
		public async Task<IActionResult> Exchange(OpenIdConnectRequest oIdRequest)
		{
			if (oIdRequest.IsPasswordGrantType())
			{
				ApplicationUser user = await _userManager.FindByEmailAsync(oIdRequest.Username) ?? await _userManager.FindByNameAsync(oIdRequest.Username);
				if (user == null)
				{
					return BadRequest(new OpenIdConnectResponse
					{
						Error = OpenIdConnectConstants.Errors.InvalidGrant,
						ErrorDescription = "Please check that your email and password is correct"
					});
				}

				// Ensure the user is enabled.
				if (!user.IsEnabled)
				{
					return BadRequest(new OpenIdConnectResponse
					{
						Error = OpenIdConnectConstants.Errors.InvalidGrant,
						ErrorDescription = "The specified user account is disabled"
					});
				}


				// Validate the username/password parameters and ensure the account is not locked out.
				Microsoft.AspNetCore.Identity.SignInResult result = await _signInManager.CheckPasswordSignInAsync(user, oIdRequest.Password, true);

				// Ensure the user is not already locked out.
				if (result.IsLockedOut)
				{
					return BadRequest(new OpenIdConnectResponse
					{
						Error = OpenIdConnectConstants.Errors.InvalidGrant,
						ErrorDescription = "The specified user account has been suspended"
					});
				}

				// Reject the token request if two-factor authentication has been enabled by the user.
				if (result.RequiresTwoFactor)
				{
					return BadRequest(new OpenIdConnectResponse
					{
						Error = OpenIdConnectConstants.Errors.InvalidGrant,
						ErrorDescription = "Invalid login procedure"
					});
				}

				// Ensure the user is allowed to sign in.
				if (result.IsNotAllowed)
				{
					return BadRequest(new OpenIdConnectResponse
					{
						Error = OpenIdConnectConstants.Errors.InvalidGrant,
						ErrorDescription = "The specified user is not allowed to sign in"
					});
				}

				if (!result.Succeeded)
				{
					return BadRequest(new OpenIdConnectResponse
					{
						Error = OpenIdConnectConstants.Errors.InvalidGrant,
						ErrorDescription = "Please check that your email and password is correct"
					});
				}



				// Create a new authentication ticket.
				AuthenticationTicket ticket = await CreateTicketAsync(oIdRequest, user);

				return SignIn(ticket.Principal, ticket.Properties, ticket.AuthenticationScheme);
			}
			else if (oIdRequest.IsRefreshTokenGrantType())
			{
				// Retrieve the claims principal stored in the refresh token.
				AuthenticateResult info = await HttpContext.AuthenticateAsync(OpenIddictServerDefaults.AuthenticationScheme);

				// Retrieve the user profile corresponding to the refresh token.
				// Note: if you want to automatically invalidate the refresh token
				// when the user password/roles change, use the following line instead:
				// var user = _signInManager.ValidateSecurityStampAsync(info.Principal);
				ApplicationUser user = await _userManager.GetUserAsync(info.Principal);
				if (user == null)
				{
					return BadRequest(new OpenIdConnectResponse
					{
						Error = OpenIdConnectConstants.Errors.InvalidGrant,
						ErrorDescription = "The refresh token is no longer valid"
					});
				}

				// Ensure the user is still allowed to sign in.
				if (!await _signInManager.CanSignInAsync(user))
				{
					return BadRequest(new OpenIdConnectResponse
					{
						Error = OpenIdConnectConstants.Errors.InvalidGrant,
						ErrorDescription = "The user is no longer allowed to sign in"
					});
				}

				// Create a new authentication ticket, but reuse the properties stored
				// in the refresh token, including the scopes originally granted.
				AuthenticationTicket ticket = await CreateTicketAsync(oIdRequest, user);

				return SignIn(ticket.Principal, ticket.Properties, ticket.AuthenticationScheme);
			}
			return BadRequest(new OpenIdConnectResponse
			{
				Error = OpenIdConnectConstants.Errors.UnsupportedGrantType,
				ErrorDescription = "The specified grant type is not supported"
			});
		}

		private async Task<AuthenticationTicket> CreateTicketAsync(OpenIdConnectRequest request, ApplicationUser user)
		{
			// Create a new ClaimsPrincipal containing the claims that
			// will be used to create an id_token, a token or a code.
			ClaimsPrincipal principal = await _signInManager.CreateUserPrincipalAsync(user);

			// Create a new authentication ticket holding the user identity.
			AuthenticationTicket ticket = new AuthenticationTicket(principal, new AuthenticationProperties(), OpenIddictServerDefaults.AuthenticationScheme);


			//if (!request.IsRefreshTokenGrantType())
			//{
			// Set the list of scopes granted to the client application.
			// Note: the offline_access scope must be granted
			// to allow OpenIddict to return a refresh token.
			ticket.SetScopes(new[]
			{
					OpenIdConnectConstants.Scopes.OpenId,
					OpenIdConnectConstants.Scopes.Email,
					OpenIdConnectConstants.Scopes.Phone,
					OpenIdConnectConstants.Scopes.Profile,
					OpenIdConnectConstants.Scopes.OfflineAccess,
					OpenIddictConstants.Scopes.Roles
			}.Intersect(request.GetScopes()));
			//}

			//ticket.SetResources("quickapp-api");

			// Note: by default, claims are NOT automatically included in the access and identity tokens.
			// To allow OpenIddict to serialize them, you must attach them a destination, that specifies
			// whether they should be included in access tokens, in identity tokens or in both.

			foreach (Claim claim in ticket.Principal.Claims)
			{
				// Never include the security stamp in the access and identity tokens, as it's a secret value.
				if (claim.Type == _identityOptions.Value.ClaimsIdentity.SecurityStampClaimType)
				{
					continue;
				}

				List<string> destinations = new List<string> { OpenIdConnectConstants.Destinations.AccessToken };

				// Only add the iterated claim to the id_token if the corresponding scope was granted to the client application.
				// The other claims will only be added to the access_token, which is encrypted when using the default format.
				if ((claim.Type == OpenIdConnectConstants.Claims.Subject && ticket.HasScope(OpenIdConnectConstants.Scopes.OpenId)) ||
					(claim.Type == OpenIdConnectConstants.Claims.Name && ticket.HasScope(OpenIdConnectConstants.Scopes.Profile)) ||
					(claim.Type == OpenIdConnectConstants.Claims.Role && ticket.HasScope(OpenIddictConstants.Claims.Roles)) ||
					(claim.Type == CustomClaimTypes.Permission && ticket.HasScope(OpenIddictConstants.Claims.Roles)))
				{
					destinations.Add(OpenIdConnectConstants.Destinations.IdentityToken);
				}


				claim.SetDestinations(destinations);
			}


			ClaimsIdentity identity = principal.Identity as ClaimsIdentity;


			if (ticket.HasScope(OpenIdConnectConstants.Scopes.Profile))
			{
				identity.AddClaim(CustomClaimTypes.JobTitle, user.JobTitle.ToString(), OpenIdConnectConstants.Destinations.IdentityToken);

				if (!string.IsNullOrWhiteSpace(user.FullName))
				{
					identity.AddClaim(CustomClaimTypes.FullName, user.FullName, OpenIdConnectConstants.Destinations.IdentityToken);
				}

				if (!string.IsNullOrWhiteSpace(user.Configuration))
				{
					identity.AddClaim(CustomClaimTypes.Configuration, user.Configuration, OpenIdConnectConstants.Destinations.IdentityToken);
				}
			}

			if (ticket.HasScope(OpenIdConnectConstants.Scopes.Email))
			{
				if (!string.IsNullOrWhiteSpace(user.Email))
				{
					identity.AddClaim(CustomClaimTypes.Email, user.Email, OpenIdConnectConstants.Destinations.IdentityToken);
				}
			}

			if (ticket.HasScope(OpenIdConnectConstants.Scopes.Phone))
			{
				if (!string.IsNullOrWhiteSpace(user.PhoneNumber))
				{
					identity.AddClaim(CustomClaimTypes.Phone, user.PhoneNumber, OpenIdConnectConstants.Destinations.IdentityToken);
				}
			}


			return ticket;
		}
	}
}
