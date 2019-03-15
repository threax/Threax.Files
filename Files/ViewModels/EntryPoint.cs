﻿using Halcyon.HAL.Attributes;
using Files.Controllers.Api;
using Threax.AspNetCore.Halcyon.Ext;
using Threax.AspNetCore.UserBuilder.Entities.Mvc;
using Threax.AspNetCore.UserLookup.Mvc.Controllers;

namespace Files.ViewModels
{
    [HalModel]
    [HalEntryPoint]
    [HalSelfActionLink(typeof(EntryPointController), nameof(EntryPointController.Get))]
    //This first set of links is for role editing, you can erase them if you don't have users or roles.
    [HalActionLink(RolesControllerRels.GetUser, typeof(RolesController))]
    [HalActionLink(RolesControllerRels.ListUsers, typeof(RolesController))]
    [HalActionLink(RolesControllerRels.SetUser, typeof(RolesController))]
    //User Search Actions
    [HalActionLink(typeof(UserSearchController), nameof(UserSearchController.List), "ListAppUsers")]
    //The additional entry point links are in the other entry point partial classes, expand this node to see them

    [HalActionLink(FilesController.Rels.UploadFile, typeof(FilesController))]
    [HalActionLink(FilesController.Rels.DeleteFile, typeof(FilesController))]
    [HalActionLink(FilesController.Rels.ListUploadedFiles, typeof(FilesController))]
    public partial class EntryPoint
    {
    }
}
