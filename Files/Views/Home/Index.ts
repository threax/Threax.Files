import * as standardCrudPage from 'hr.widgets.StandardCrudPage';
import * as startup from 'clientlibs.startup';
import * as deepLink from 'hr.deeplink';
import { PathInfoCrudInjector } from 'clientlibs.PathInfoCrudInjector';

import { CrudQueryManager, ICrudQueryComponent, QueryEventArgs } from 'hr.widgets.CrudQuery';
import * as controller from 'hr.controller';
import { CrudTableRowControllerExtensions, ICrudService, CrudTableRowController } from 'hr.widgets.CrudPage';
import * as client from 'clientlibs.ServiceClient';

var injector = PathInfoCrudInjector;

class PathQueryComponent extends ICrudQueryComponent {
    public static get InjectorArgs(): controller.InjectableArgs {
        return [CrudQueryManager];
    }

    private forceDirectory?: string = null;

    constructor(private queryManager: CrudQueryManager) {
        super();
        this.queryManager.addComponent(this);
    }

    public setupQuery(query: any): void {
        if (this.forceDirectory !== null) {
            query["directory"] = this.forceDirectory;
            this.forceDirectory = null;
        }
    }

    public setForceDirectory(dir: string): void {
        this.forceDirectory = dir;
    }
}

class FileRow extends CrudTableRowControllerExtensions {
    public static get InjectorArgs(): controller.InjectableArgs {
        return [ICrudService, PathQueryComponent, CrudQueryManager];
    }

    private data: client.PathInfoResult;

    constructor(private crudService: ICrudService, private pathQuery: PathQueryComponent, private queryManager: CrudQueryManager) {
        super();
    }

    public rowConstructed(row: CrudTableRowController, bindings: controller.BindingCollection, data: client.PathInfoResult): void {
        bindings.setListener(this);
        this.data = data;
    }

    public async visit(evt: Event): Promise<void> {
        if (this.data.data.isFile) {
            if (this.data.canDownload()) {
                window.location.href = this.data.linkForDownload().href;
            }
        }
        else {
            this.pathQuery.setForceDirectory(this.data.data.path);
            this.crudService.getPage(this.queryManager.setupQuery());
        }
    }
}

var builder = startup.createBuilder();
deepLink.addServices(builder.Services);
standardCrudPage.addServices(builder, injector);
builder.Services.addShared(PathQueryComponent, PathQueryComponent);
builder.Services.addTransient(CrudTableRowControllerExtensions, FileRow);
standardCrudPage.createControllers(builder, new standardCrudPage.Settings());
builder.createUnbound(PathQueryComponent);