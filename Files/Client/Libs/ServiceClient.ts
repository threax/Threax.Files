import * as hal from 'hr.halcyon.EndpointClient';

export class RoleAssignmentsResult {
    private client: hal.HalEndpointClient;

    constructor(client: hal.HalEndpointClient) {
        this.client = client;
    }

    private strongData: RoleAssignments = undefined;
    public get data(): RoleAssignments {
        this.strongData = this.strongData || this.client.GetData<RoleAssignments>();
        return this.strongData;
    }

    public refresh(): Promise<RoleAssignmentsResult> {
        return this.client.LoadLink("self")
               .then(r => {
                    return new RoleAssignmentsResult(r);
                });

    }

    public canRefresh(): boolean {
        return this.client.HasLink("self");
    }

    public linkForRefresh(): hal.HalLink {
        return this.client.GetLink("self");
    }

    public getRefreshDocs(query?: HalEndpointDocQuery): Promise<hal.HalEndpointDoc> {
        return this.client.LoadLinkDoc("self", query)
            .then(r => {
                return r.GetData<hal.HalEndpointDoc>();
            });
    }

    public hasRefreshDocs(): boolean {
        return this.client.HasLinkDoc("self");
    }

    public setUser(data: RoleAssignments): Promise<RoleAssignmentsResult> {
        return this.client.LoadLinkWithData("SetUser", data)
               .then(r => {
                    return new RoleAssignmentsResult(r);
                });

    }

    public canSetUser(): boolean {
        return this.client.HasLink("SetUser");
    }

    public linkForSetUser(): hal.HalLink {
        return this.client.GetLink("SetUser");
    }

    public getSetUserDocs(query?: HalEndpointDocQuery): Promise<hal.HalEndpointDoc> {
        return this.client.LoadLinkDoc("SetUser", query)
            .then(r => {
                return r.GetData<hal.HalEndpointDoc>();
            });
    }

    public hasSetUserDocs(): boolean {
        return this.client.HasLinkDoc("SetUser");
    }

    public update(data: RoleAssignments): Promise<RoleAssignmentsResult> {
        return this.client.LoadLinkWithData("Update", data)
               .then(r => {
                    return new RoleAssignmentsResult(r);
                });

    }

    public canUpdate(): boolean {
        return this.client.HasLink("Update");
    }

    public linkForUpdate(): hal.HalLink {
        return this.client.GetLink("Update");
    }

    public getUpdateDocs(query?: HalEndpointDocQuery): Promise<hal.HalEndpointDoc> {
        return this.client.LoadLinkDoc("Update", query)
            .then(r => {
                return r.GetData<hal.HalEndpointDoc>();
            });
    }

    public hasUpdateDocs(): boolean {
        return this.client.HasLinkDoc("Update");
    }

    public delete(): Promise<void> {
        return this.client.LoadLink("Delete").then(hal.makeVoid);
    }

    public canDelete(): boolean {
        return this.client.HasLink("Delete");
    }

    public linkForDelete(): hal.HalLink {
        return this.client.GetLink("Delete");
    }
}

export class EntryPointInjector {
    private url: string;
    private fetcher: hal.Fetcher;
    private instancePromise: Promise<EntryPointResult>;

    constructor(url: string, fetcher: hal.Fetcher) {
        this.url = url;
        this.fetcher = fetcher;
    }

    public load(): Promise<EntryPointResult> {
        if (!this.instancePromise) {
            this.instancePromise = EntryPointResult.Load(this.url, this.fetcher);
        }

        return this.instancePromise;
    }
}

export class EntryPointResult {
    private client: hal.HalEndpointClient;

    public static Load(url: string, fetcher: hal.Fetcher): Promise<EntryPointResult> {
        return hal.HalEndpointClient.Load({
            href: url,
            method: "GET"
        }, fetcher)
            .then(c => {
                 return new EntryPointResult(c);
             });
            }

    constructor(client: hal.HalEndpointClient) {
        this.client = client;
    }

    private strongData: EntryPoint = undefined;
    public get data(): EntryPoint {
        this.strongData = this.strongData || this.client.GetData<EntryPoint>();
        return this.strongData;
    }

    public refresh(): Promise<EntryPointResult> {
        return this.client.LoadLink("self")
               .then(r => {
                    return new EntryPointResult(r);
                });

    }

    public canRefresh(): boolean {
        return this.client.HasLink("self");
    }

    public linkForRefresh(): hal.HalLink {
        return this.client.GetLink("self");
    }

    public getRefreshDocs(query?: HalEndpointDocQuery): Promise<hal.HalEndpointDoc> {
        return this.client.LoadLinkDoc("self", query)
            .then(r => {
                return r.GetData<hal.HalEndpointDoc>();
            });
    }

    public hasRefreshDocs(): boolean {
        return this.client.HasLinkDoc("self");
    }

    public getUser(): Promise<RoleAssignmentsResult> {
        return this.client.LoadLink("GetUser")
               .then(r => {
                    return new RoleAssignmentsResult(r);
                });

    }

    public canGetUser(): boolean {
        return this.client.HasLink("GetUser");
    }

    public linkForGetUser(): hal.HalLink {
        return this.client.GetLink("GetUser");
    }

    public getGetUserDocs(query?: HalEndpointDocQuery): Promise<hal.HalEndpointDoc> {
        return this.client.LoadLinkDoc("GetUser", query)
            .then(r => {
                return r.GetData<hal.HalEndpointDoc>();
            });
    }

    public hasGetUserDocs(): boolean {
        return this.client.HasLinkDoc("GetUser");
    }

    public listUsers(data: RolesQuery): Promise<UserCollectionResult> {
        return this.client.LoadLinkWithData("ListUsers", data)
               .then(r => {
                    return new UserCollectionResult(r);
                });

    }

    public canListUsers(): boolean {
        return this.client.HasLink("ListUsers");
    }

    public linkForListUsers(): hal.HalLink {
        return this.client.GetLink("ListUsers");
    }

    public getListUsersDocs(query?: HalEndpointDocQuery): Promise<hal.HalEndpointDoc> {
        return this.client.LoadLinkDoc("ListUsers", query)
            .then(r => {
                return r.GetData<hal.HalEndpointDoc>();
            });
    }

    public hasListUsersDocs(): boolean {
        return this.client.HasLinkDoc("ListUsers");
    }

    public setUser(data: RoleAssignments): Promise<RoleAssignmentsResult> {
        return this.client.LoadLinkWithData("SetUser", data)
               .then(r => {
                    return new RoleAssignmentsResult(r);
                });

    }

    public canSetUser(): boolean {
        return this.client.HasLink("SetUser");
    }

    public linkForSetUser(): hal.HalLink {
        return this.client.GetLink("SetUser");
    }

    public getSetUserDocs(query?: HalEndpointDocQuery): Promise<hal.HalEndpointDoc> {
        return this.client.LoadLinkDoc("SetUser", query)
            .then(r => {
                return r.GetData<hal.HalEndpointDoc>();
            });
    }

    public hasSetUserDocs(): boolean {
        return this.client.HasLinkDoc("SetUser");
    }

    public listAppUsers(data: UserSearchQuery): Promise<UserSearchCollectionResult> {
        return this.client.LoadLinkWithData("ListAppUsers", data)
               .then(r => {
                    return new UserSearchCollectionResult(r);
                });

    }

    public canListAppUsers(): boolean {
        return this.client.HasLink("ListAppUsers");
    }

    public linkForListAppUsers(): hal.HalLink {
        return this.client.GetLink("ListAppUsers");
    }

    public getListAppUsersDocs(query?: HalEndpointDocQuery): Promise<hal.HalEndpointDoc> {
        return this.client.LoadLinkDoc("ListAppUsers", query)
            .then(r => {
                return r.GetData<hal.HalEndpointDoc>();
            });
    }

    public hasListAppUsersDocs(): boolean {
        return this.client.HasLinkDoc("ListAppUsers");
    }

    public uploadFile(data: UploadInput): Promise<void> {
        return this.client.LoadLinkWithData("UploadFile", data).then(hal.makeVoid);
    }

    public canUploadFile(): boolean {
        return this.client.HasLink("UploadFile");
    }

    public linkForUploadFile(): hal.HalLink {
        return this.client.GetLink("UploadFile");
    }

    public getUploadFileDocs(query?: HalEndpointDocQuery): Promise<hal.HalEndpointDoc> {
        return this.client.LoadLinkDoc("UploadFile", query)
            .then(r => {
                return r.GetData<hal.HalEndpointDoc>();
            });
    }

    public hasUploadFileDocs(): boolean {
        return this.client.HasLinkDoc("UploadFile");
    }

    public deleteFile(data: DeleteFileQuery): Promise<void> {
        return this.client.LoadLinkWithData("DeleteFile", data).then(hal.makeVoid);
    }

    public canDeleteFile(): boolean {
        return this.client.HasLink("DeleteFile");
    }

    public linkForDeleteFile(): hal.HalLink {
        return this.client.GetLink("DeleteFile");
    }

    public getDeleteFileDocs(query?: HalEndpointDocQuery): Promise<hal.HalEndpointDoc> {
        return this.client.LoadLinkDoc("DeleteFile", query)
            .then(r => {
                return r.GetData<hal.HalEndpointDoc>();
            });
    }

    public hasDeleteFileDocs(): boolean {
        return this.client.HasLinkDoc("DeleteFile");
    }

    public listUploadedFiles(data: ListFileQuery): Promise<FileListResult> {
        return this.client.LoadLinkWithData("ListUploadedFiles", data)
               .then(r => {
                    return new FileListResult(r);
                });

    }

    public canListUploadedFiles(): boolean {
        return this.client.HasLink("ListUploadedFiles");
    }

    public linkForListUploadedFiles(): hal.HalLink {
        return this.client.GetLink("ListUploadedFiles");
    }

    public getListUploadedFilesDocs(query?: HalEndpointDocQuery): Promise<hal.HalEndpointDoc> {
        return this.client.LoadLinkDoc("ListUploadedFiles", query)
            .then(r => {
                return r.GetData<hal.HalEndpointDoc>();
            });
    }

    public hasListUploadedFilesDocs(): boolean {
        return this.client.HasLinkDoc("ListUploadedFiles");
    }

    public listPathInfos(data: PathInfoQuery): Promise<PathInfoCollectionResult> {
        return this.client.LoadLinkWithData("ListPathInfos", data)
               .then(r => {
                    return new PathInfoCollectionResult(r);
                });

    }

    public canListPathInfos(): boolean {
        return this.client.HasLink("ListPathInfos");
    }

    public linkForListPathInfos(): hal.HalLink {
        return this.client.GetLink("ListPathInfos");
    }

    public getListPathInfosDocs(query?: HalEndpointDocQuery): Promise<hal.HalEndpointDoc> {
        return this.client.LoadLinkDoc("ListPathInfos", query)
            .then(r => {
                return r.GetData<hal.HalEndpointDoc>();
            });
    }

    public hasListPathInfosDocs(): boolean {
        return this.client.HasLinkDoc("ListPathInfos");
    }

    public addPathInfo(data: PathInfoInput): Promise<PathInfoResult> {
        return this.client.LoadLinkWithData("AddPathInfo", data)
               .then(r => {
                    return new PathInfoResult(r);
                });

    }

    public canAddPathInfo(): boolean {
        return this.client.HasLink("AddPathInfo");
    }

    public linkForAddPathInfo(): hal.HalLink {
        return this.client.GetLink("AddPathInfo");
    }

    public getAddPathInfoDocs(query?: HalEndpointDocQuery): Promise<hal.HalEndpointDoc> {
        return this.client.LoadLinkDoc("AddPathInfo", query)
            .then(r => {
                return r.GetData<hal.HalEndpointDoc>();
            });
    }

    public hasAddPathInfoDocs(): boolean {
        return this.client.HasLinkDoc("AddPathInfo");
    }
}

export class FileListResult {
    private client: hal.HalEndpointClient;

    constructor(client: hal.HalEndpointClient) {
        this.client = client;
    }

    private strongData: FileList = undefined;
    public get data(): FileList {
        this.strongData = this.strongData || this.client.GetData<FileList>();
        return this.strongData;
    }

    public listUploadedFiles(data: ListFileQuery): Promise<FileListResult> {
        return this.client.LoadLinkWithData("ListUploadedFiles", data)
               .then(r => {
                    return new FileListResult(r);
                });

    }

    public canListUploadedFiles(): boolean {
        return this.client.HasLink("ListUploadedFiles");
    }

    public linkForListUploadedFiles(): hal.HalLink {
        return this.client.GetLink("ListUploadedFiles");
    }

    public getListUploadedFilesDocs(query?: HalEndpointDocQuery): Promise<hal.HalEndpointDoc> {
        return this.client.LoadLinkDoc("ListUploadedFiles", query)
            .then(r => {
                return r.GetData<hal.HalEndpointDoc>();
            });
    }

    public hasListUploadedFilesDocs(): boolean {
        return this.client.HasLinkDoc("ListUploadedFiles");
    }

    public uploadFile(data: UploadInput): Promise<void> {
        return this.client.LoadLinkWithData("UploadFile", data).then(hal.makeVoid);
    }

    public canUploadFile(): boolean {
        return this.client.HasLink("UploadFile");
    }

    public linkForUploadFile(): hal.HalLink {
        return this.client.GetLink("UploadFile");
    }

    public getUploadFileDocs(query?: HalEndpointDocQuery): Promise<hal.HalEndpointDoc> {
        return this.client.LoadLinkDoc("UploadFile", query)
            .then(r => {
                return r.GetData<hal.HalEndpointDoc>();
            });
    }

    public hasUploadFileDocs(): boolean {
        return this.client.HasLinkDoc("UploadFile");
    }

    public deleteFile(data: DeleteFileQuery): Promise<void> {
        return this.client.LoadLinkWithData("DeleteFile", data).then(hal.makeVoid);
    }

    public canDeleteFile(): boolean {
        return this.client.HasLink("DeleteFile");
    }

    public linkForDeleteFile(): hal.HalLink {
        return this.client.GetLink("DeleteFile");
    }

    public getDeleteFileDocs(query?: HalEndpointDocQuery): Promise<hal.HalEndpointDoc> {
        return this.client.LoadLinkDoc("DeleteFile", query)
            .then(r => {
                return r.GetData<hal.HalEndpointDoc>();
            });
    }

    public hasDeleteFileDocs(): boolean {
        return this.client.HasLinkDoc("DeleteFile");
    }
}

export class PathInfoResult {
    private client: hal.HalEndpointClient;

    constructor(client: hal.HalEndpointClient) {
        this.client = client;
    }

    private strongData: PathInfo = undefined;
    public get data(): PathInfo {
        this.strongData = this.strongData || this.client.GetData<PathInfo>();
        return this.strongData;
    }

    public refresh(): Promise<PathInfoResult> {
        return this.client.LoadLink("self")
               .then(r => {
                    return new PathInfoResult(r);
                });

    }

    public canRefresh(): boolean {
        return this.client.HasLink("self");
    }

    public linkForRefresh(): hal.HalLink {
        return this.client.GetLink("self");
    }

    public getRefreshDocs(query?: HalEndpointDocQuery): Promise<hal.HalEndpointDoc> {
        return this.client.LoadLinkDoc("self", query)
            .then(r => {
                return r.GetData<hal.HalEndpointDoc>();
            });
    }

    public hasRefreshDocs(): boolean {
        return this.client.HasLinkDoc("self");
    }

    public delete(): Promise<void> {
        return this.client.LoadLink("Delete").then(hal.makeVoid);
    }

    public canDelete(): boolean {
        return this.client.HasLink("Delete");
    }

    public linkForDelete(): hal.HalLink {
        return this.client.GetLink("Delete");
    }
}

export class PathInfoCollectionResult {
    private client: hal.HalEndpointClient;

    constructor(client: hal.HalEndpointClient) {
        this.client = client;
    }

    private strongData: PathInfoCollection = undefined;
    public get data(): PathInfoCollection {
        this.strongData = this.strongData || this.client.GetData<PathInfoCollection>();
        return this.strongData;
    }

    private itemsStrong: PathInfoResult[];
    public get items(): PathInfoResult[] {
        if (this.itemsStrong === undefined) {
            var embeds = this.client.GetEmbed("values");
            var clients = embeds.GetAllClients();
            this.itemsStrong = [];
            for (var i = 0; i < clients.length; ++i) {
                this.itemsStrong.push(new PathInfoResult(clients[i]));
            }
        }
        return this.itemsStrong;
    }

    public refresh(): Promise<PathInfoCollectionResult> {
        return this.client.LoadLink("self")
               .then(r => {
                    return new PathInfoCollectionResult(r);
                });

    }

    public canRefresh(): boolean {
        return this.client.HasLink("self");
    }

    public linkForRefresh(): hal.HalLink {
        return this.client.GetLink("self");
    }

    public getRefreshDocs(query?: HalEndpointDocQuery): Promise<hal.HalEndpointDoc> {
        return this.client.LoadLinkDoc("self", query)
            .then(r => {
                return r.GetData<hal.HalEndpointDoc>();
            });
    }

    public hasRefreshDocs(): boolean {
        return this.client.HasLinkDoc("self");
    }

    public getGetDocs(query?: HalEndpointDocQuery): Promise<hal.HalEndpointDoc> {
        return this.client.LoadLinkDoc("Get", query)
            .then(r => {
                return r.GetData<hal.HalEndpointDoc>();
            });
    }

    public hasGetDocs(): boolean {
        return this.client.HasLinkDoc("Get");
    }

    public getListDocs(query?: HalEndpointDocQuery): Promise<hal.HalEndpointDoc> {
        return this.client.LoadLinkDoc("List", query)
            .then(r => {
                return r.GetData<hal.HalEndpointDoc>();
            });
    }

    public hasListDocs(): boolean {
        return this.client.HasLinkDoc("List");
    }

    public add(data: PathInfoInput): Promise<PathInfoResult> {
        return this.client.LoadLinkWithData("Add", data)
               .then(r => {
                    return new PathInfoResult(r);
                });

    }

    public canAdd(): boolean {
        return this.client.HasLink("Add");
    }

    public linkForAdd(): hal.HalLink {
        return this.client.GetLink("Add");
    }

    public getAddDocs(query?: HalEndpointDocQuery): Promise<hal.HalEndpointDoc> {
        return this.client.LoadLinkDoc("Add", query)
            .then(r => {
                return r.GetData<hal.HalEndpointDoc>();
            });
    }

    public hasAddDocs(): boolean {
        return this.client.HasLinkDoc("Add");
    }

    public next(): Promise<PathInfoCollectionResult> {
        return this.client.LoadLink("next")
               .then(r => {
                    return new PathInfoCollectionResult(r);
                });

    }

    public canNext(): boolean {
        return this.client.HasLink("next");
    }

    public linkForNext(): hal.HalLink {
        return this.client.GetLink("next");
    }

    public getNextDocs(query?: HalEndpointDocQuery): Promise<hal.HalEndpointDoc> {
        return this.client.LoadLinkDoc("next", query)
            .then(r => {
                return r.GetData<hal.HalEndpointDoc>();
            });
    }

    public hasNextDocs(): boolean {
        return this.client.HasLinkDoc("next");
    }

    public previous(): Promise<PathInfoCollectionResult> {
        return this.client.LoadLink("previous")
               .then(r => {
                    return new PathInfoCollectionResult(r);
                });

    }

    public canPrevious(): boolean {
        return this.client.HasLink("previous");
    }

    public linkForPrevious(): hal.HalLink {
        return this.client.GetLink("previous");
    }

    public getPreviousDocs(query?: HalEndpointDocQuery): Promise<hal.HalEndpointDoc> {
        return this.client.LoadLinkDoc("previous", query)
            .then(r => {
                return r.GetData<hal.HalEndpointDoc>();
            });
    }

    public hasPreviousDocs(): boolean {
        return this.client.HasLinkDoc("previous");
    }

    public first(): Promise<PathInfoCollectionResult> {
        return this.client.LoadLink("first")
               .then(r => {
                    return new PathInfoCollectionResult(r);
                });

    }

    public canFirst(): boolean {
        return this.client.HasLink("first");
    }

    public linkForFirst(): hal.HalLink {
        return this.client.GetLink("first");
    }

    public getFirstDocs(query?: HalEndpointDocQuery): Promise<hal.HalEndpointDoc> {
        return this.client.LoadLinkDoc("first", query)
            .then(r => {
                return r.GetData<hal.HalEndpointDoc>();
            });
    }

    public hasFirstDocs(): boolean {
        return this.client.HasLinkDoc("first");
    }

    public last(): Promise<PathInfoCollectionResult> {
        return this.client.LoadLink("last")
               .then(r => {
                    return new PathInfoCollectionResult(r);
                });

    }

    public canLast(): boolean {
        return this.client.HasLink("last");
    }

    public linkForLast(): hal.HalLink {
        return this.client.GetLink("last");
    }

    public getLastDocs(query?: HalEndpointDocQuery): Promise<hal.HalEndpointDoc> {
        return this.client.LoadLinkDoc("last", query)
            .then(r => {
                return r.GetData<hal.HalEndpointDoc>();
            });
    }

    public hasLastDocs(): boolean {
        return this.client.HasLinkDoc("last");
    }
}

export class UserCollectionResult {
    private client: hal.HalEndpointClient;

    constructor(client: hal.HalEndpointClient) {
        this.client = client;
    }

    private strongData: UserCollection = undefined;
    public get data(): UserCollection {
        this.strongData = this.strongData || this.client.GetData<UserCollection>();
        return this.strongData;
    }

    private itemsStrong: RoleAssignmentsResult[];
    public get items(): RoleAssignmentsResult[] {
        if (this.itemsStrong === undefined) {
            var embeds = this.client.GetEmbed("values");
            var clients = embeds.GetAllClients();
            this.itemsStrong = [];
            for (var i = 0; i < clients.length; ++i) {
                this.itemsStrong.push(new RoleAssignmentsResult(clients[i]));
            }
        }
        return this.itemsStrong;
    }

    public refresh(): Promise<UserCollectionResult> {
        return this.client.LoadLink("self")
               .then(r => {
                    return new UserCollectionResult(r);
                });

    }

    public canRefresh(): boolean {
        return this.client.HasLink("self");
    }

    public linkForRefresh(): hal.HalLink {
        return this.client.GetLink("self");
    }

    public getRefreshDocs(query?: HalEndpointDocQuery): Promise<hal.HalEndpointDoc> {
        return this.client.LoadLinkDoc("self", query)
            .then(r => {
                return r.GetData<hal.HalEndpointDoc>();
            });
    }

    public hasRefreshDocs(): boolean {
        return this.client.HasLinkDoc("self");
    }

    public getGetDocs(query?: HalEndpointDocQuery): Promise<hal.HalEndpointDoc> {
        return this.client.LoadLinkDoc("Get", query)
            .then(r => {
                return r.GetData<hal.HalEndpointDoc>();
            });
    }

    public hasGetDocs(): boolean {
        return this.client.HasLinkDoc("Get");
    }

    public getListDocs(query?: HalEndpointDocQuery): Promise<hal.HalEndpointDoc> {
        return this.client.LoadLinkDoc("List", query)
            .then(r => {
                return r.GetData<hal.HalEndpointDoc>();
            });
    }

    public hasListDocs(): boolean {
        return this.client.HasLinkDoc("List");
    }

    public getUpdateDocs(query?: HalEndpointDocQuery): Promise<hal.HalEndpointDoc> {
        return this.client.LoadLinkDoc("Update", query)
            .then(r => {
                return r.GetData<hal.HalEndpointDoc>();
            });
    }

    public hasUpdateDocs(): boolean {
        return this.client.HasLinkDoc("Update");
    }

    public add(data: RoleAssignments): Promise<RoleAssignmentsResult> {
        return this.client.LoadLinkWithData("Add", data)
               .then(r => {
                    return new RoleAssignmentsResult(r);
                });

    }

    public canAdd(): boolean {
        return this.client.HasLink("Add");
    }

    public linkForAdd(): hal.HalLink {
        return this.client.GetLink("Add");
    }

    public getAddDocs(query?: HalEndpointDocQuery): Promise<hal.HalEndpointDoc> {
        return this.client.LoadLinkDoc("Add", query)
            .then(r => {
                return r.GetData<hal.HalEndpointDoc>();
            });
    }

    public hasAddDocs(): boolean {
        return this.client.HasLinkDoc("Add");
    }

    public next(): Promise<UserCollectionResult> {
        return this.client.LoadLink("next")
               .then(r => {
                    return new UserCollectionResult(r);
                });

    }

    public canNext(): boolean {
        return this.client.HasLink("next");
    }

    public linkForNext(): hal.HalLink {
        return this.client.GetLink("next");
    }

    public getNextDocs(query?: HalEndpointDocQuery): Promise<hal.HalEndpointDoc> {
        return this.client.LoadLinkDoc("next", query)
            .then(r => {
                return r.GetData<hal.HalEndpointDoc>();
            });
    }

    public hasNextDocs(): boolean {
        return this.client.HasLinkDoc("next");
    }

    public previous(): Promise<UserCollectionResult> {
        return this.client.LoadLink("previous")
               .then(r => {
                    return new UserCollectionResult(r);
                });

    }

    public canPrevious(): boolean {
        return this.client.HasLink("previous");
    }

    public linkForPrevious(): hal.HalLink {
        return this.client.GetLink("previous");
    }

    public getPreviousDocs(query?: HalEndpointDocQuery): Promise<hal.HalEndpointDoc> {
        return this.client.LoadLinkDoc("previous", query)
            .then(r => {
                return r.GetData<hal.HalEndpointDoc>();
            });
    }

    public hasPreviousDocs(): boolean {
        return this.client.HasLinkDoc("previous");
    }

    public first(): Promise<UserCollectionResult> {
        return this.client.LoadLink("first")
               .then(r => {
                    return new UserCollectionResult(r);
                });

    }

    public canFirst(): boolean {
        return this.client.HasLink("first");
    }

    public linkForFirst(): hal.HalLink {
        return this.client.GetLink("first");
    }

    public getFirstDocs(query?: HalEndpointDocQuery): Promise<hal.HalEndpointDoc> {
        return this.client.LoadLinkDoc("first", query)
            .then(r => {
                return r.GetData<hal.HalEndpointDoc>();
            });
    }

    public hasFirstDocs(): boolean {
        return this.client.HasLinkDoc("first");
    }

    public last(): Promise<UserCollectionResult> {
        return this.client.LoadLink("last")
               .then(r => {
                    return new UserCollectionResult(r);
                });

    }

    public canLast(): boolean {
        return this.client.HasLink("last");
    }

    public linkForLast(): hal.HalLink {
        return this.client.GetLink("last");
    }

    public getLastDocs(query?: HalEndpointDocQuery): Promise<hal.HalEndpointDoc> {
        return this.client.LoadLinkDoc("last", query)
            .then(r => {
                return r.GetData<hal.HalEndpointDoc>();
            });
    }

    public hasLastDocs(): boolean {
        return this.client.HasLinkDoc("last");
    }
}

export class UserSearchResult {
    private client: hal.HalEndpointClient;

    constructor(client: hal.HalEndpointClient) {
        this.client = client;
    }

    private strongData: UserSearch = undefined;
    public get data(): UserSearch {
        this.strongData = this.strongData || this.client.GetData<UserSearch>();
        return this.strongData;
    }

    public refresh(): Promise<UserSearchResult> {
        return this.client.LoadLink("self")
               .then(r => {
                    return new UserSearchResult(r);
                });

    }

    public canRefresh(): boolean {
        return this.client.HasLink("self");
    }

    public linkForRefresh(): hal.HalLink {
        return this.client.GetLink("self");
    }

    public getRefreshDocs(query?: HalEndpointDocQuery): Promise<hal.HalEndpointDoc> {
        return this.client.LoadLinkDoc("self", query)
            .then(r => {
                return r.GetData<hal.HalEndpointDoc>();
            });
    }

    public hasRefreshDocs(): boolean {
        return this.client.HasLinkDoc("self");
    }
}

export class UserSearchCollectionResult {
    private client: hal.HalEndpointClient;

    constructor(client: hal.HalEndpointClient) {
        this.client = client;
    }

    private strongData: UserSearchCollection = undefined;
    public get data(): UserSearchCollection {
        this.strongData = this.strongData || this.client.GetData<UserSearchCollection>();
        return this.strongData;
    }

    private itemsStrong: UserSearchResult[];
    public get items(): UserSearchResult[] {
        if (this.itemsStrong === undefined) {
            var embeds = this.client.GetEmbed("values");
            var clients = embeds.GetAllClients();
            this.itemsStrong = [];
            for (var i = 0; i < clients.length; ++i) {
                this.itemsStrong.push(new UserSearchResult(clients[i]));
            }
        }
        return this.itemsStrong;
    }

    public refresh(): Promise<UserSearchCollectionResult> {
        return this.client.LoadLink("self")
               .then(r => {
                    return new UserSearchCollectionResult(r);
                });

    }

    public canRefresh(): boolean {
        return this.client.HasLink("self");
    }

    public linkForRefresh(): hal.HalLink {
        return this.client.GetLink("self");
    }

    public getRefreshDocs(query?: HalEndpointDocQuery): Promise<hal.HalEndpointDoc> {
        return this.client.LoadLinkDoc("self", query)
            .then(r => {
                return r.GetData<hal.HalEndpointDoc>();
            });
    }

    public hasRefreshDocs(): boolean {
        return this.client.HasLinkDoc("self");
    }

    public getGetDocs(query?: HalEndpointDocQuery): Promise<hal.HalEndpointDoc> {
        return this.client.LoadLinkDoc("Get", query)
            .then(r => {
                return r.GetData<hal.HalEndpointDoc>();
            });
    }

    public hasGetDocs(): boolean {
        return this.client.HasLinkDoc("Get");
    }

    public getListDocs(query?: HalEndpointDocQuery): Promise<hal.HalEndpointDoc> {
        return this.client.LoadLinkDoc("List", query)
            .then(r => {
                return r.GetData<hal.HalEndpointDoc>();
            });
    }

    public hasListDocs(): boolean {
        return this.client.HasLinkDoc("List");
    }

    public next(): Promise<UserSearchCollectionResult> {
        return this.client.LoadLink("next")
               .then(r => {
                    return new UserSearchCollectionResult(r);
                });

    }

    public canNext(): boolean {
        return this.client.HasLink("next");
    }

    public linkForNext(): hal.HalLink {
        return this.client.GetLink("next");
    }

    public getNextDocs(query?: HalEndpointDocQuery): Promise<hal.HalEndpointDoc> {
        return this.client.LoadLinkDoc("next", query)
            .then(r => {
                return r.GetData<hal.HalEndpointDoc>();
            });
    }

    public hasNextDocs(): boolean {
        return this.client.HasLinkDoc("next");
    }

    public previous(): Promise<UserSearchCollectionResult> {
        return this.client.LoadLink("previous")
               .then(r => {
                    return new UserSearchCollectionResult(r);
                });

    }

    public canPrevious(): boolean {
        return this.client.HasLink("previous");
    }

    public linkForPrevious(): hal.HalLink {
        return this.client.GetLink("previous");
    }

    public getPreviousDocs(query?: HalEndpointDocQuery): Promise<hal.HalEndpointDoc> {
        return this.client.LoadLinkDoc("previous", query)
            .then(r => {
                return r.GetData<hal.HalEndpointDoc>();
            });
    }

    public hasPreviousDocs(): boolean {
        return this.client.HasLinkDoc("previous");
    }

    public first(): Promise<UserSearchCollectionResult> {
        return this.client.LoadLink("first")
               .then(r => {
                    return new UserSearchCollectionResult(r);
                });

    }

    public canFirst(): boolean {
        return this.client.HasLink("first");
    }

    public linkForFirst(): hal.HalLink {
        return this.client.GetLink("first");
    }

    public getFirstDocs(query?: HalEndpointDocQuery): Promise<hal.HalEndpointDoc> {
        return this.client.LoadLinkDoc("first", query)
            .then(r => {
                return r.GetData<hal.HalEndpointDoc>();
            });
    }

    public hasFirstDocs(): boolean {
        return this.client.HasLinkDoc("first");
    }

    public last(): Promise<UserSearchCollectionResult> {
        return this.client.LoadLink("last")
               .then(r => {
                    return new UserSearchCollectionResult(r);
                });

    }

    public canLast(): boolean {
        return this.client.HasLink("last");
    }

    public linkForLast(): hal.HalLink {
        return this.client.GetLink("last");
    }

    public getLastDocs(query?: HalEndpointDocQuery): Promise<hal.HalEndpointDoc> {
        return this.client.LoadLinkDoc("last", query)
            .then(r => {
                return r.GetData<hal.HalEndpointDoc>();
            });
    }

    public hasLastDocs(): boolean {
        return this.client.HasLinkDoc("last");
    }
}
//----------------------
// <auto-generated>
//     Generated using the NSwag toolchain v9.10.49.0 (Newtonsoft.Json v11.0.0.0) (http://NJsonSchema.org)
// </auto-generated>
//----------------------





export interface RoleAssignments {
    /** Also add a property for any roles you define, this way the ui can offer them for editing. */
    editValues?: boolean;
    userId?: string;
    name?: string;
    editRoles?: boolean;
    superAdmin?: boolean;
}

export interface EntryPoint {
}

export interface RolesQuery {
    /** The guid for the user, this is used to look up the user. */
    userId?: string[];
    /** Search by user name. */
    name?: string;
    /** The number of pages (item number = Offset * Limit) into the collection to query. */
    offset?: number;
    /** The limit of the number of items to return. */
    limit?: number;
}

export interface UserCollection {
    /** Search by user name. */
    name?: string;
    /** The guid for the user, this is used to look up the user. */
    userId?: string[];
    total?: number;
    /** The number of pages (item number = Offset * Limit) into the collection to query. */
    offset?: number;
    /** The limit of the number of items to return. */
    limit?: number;
}

export interface UserSearchQuery {
    userId?: string;
    userName?: string;
    /** The number of pages (item number = Offset * Limit) into the collection to query. */
    offset?: number;
    /** The limit of the number of items to return. */
    limit?: number;
}

export interface UserSearchCollection {
    userName?: string;
    userId?: string;
    total?: number;
    /** The number of pages (item number = Offset * Limit) into the collection to query. */
    offset?: number;
    /** The limit of the number of items to return. */
    limit?: number;
}

export interface UploadInput {
    file?: string;
    content?: any;
}

export interface DeleteFileQuery {
    file?: string;
}

export interface ListFileQuery {
    dir?: string;
}

/** A list of files in a directory. */
export interface FileList {
    /** The directories inside this directory. */
    directories?: string[];
    /** The files inside this directory. */
    files?: string[];
    /** The path that this file list represents. */
    path?: string;
}

export interface PathInfoQuery {
    /** Get the PathInfo for a specific path. */
    path?: string;
    /** List the files in the given directory. */
    directory?: string;
    /** The search pattern to look for. */
    pattern?: string;
    /** List files and folders recursively. */
    recursive?: boolean;
    /** The number of pages (item number = Offset * Limit) into the collection to query. */
    offset?: number;
    /** The limit of the number of items to return. */
    limit?: number;
}

export interface PathInfoCollection {
    /** List the files in the given directory. */
    directory?: string;
    /** Get the PathInfo for a specific path. */
    path?: string;
    total?: number;
    /** The search pattern to look for. */
    pattern?: string;
    /** List files and folders recursively. */
    recursive?: boolean;
    /** The number of pages (item number = Offset * Limit) into the collection to query. */
    offset?: number;
    /** The limit of the number of items to return. */
    limit?: number;
}

export interface PathInfoInput {
    nothing?: number;
    file?: any;
}

export interface PathInfo {
    isDirectory?: boolean;
    path?: string;
}

export interface UserSearch {
    userId?: string;
    userName?: string;
}

export interface HalEndpointDocQuery {
    includeRequest?: boolean;
    includeResponse?: boolean;
}
