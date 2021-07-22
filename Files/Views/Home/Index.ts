import * as standardCrudPage from 'htmlrapier.widgets/src/StandardCrudPage';
import * as startup from 'Client/Libs/startup';
import * as deepLink from 'htmlrapier/src/deeplink';
import { PathInfoCrudInjector } from 'Client/Libs/PathInfoCrudInjector';

import { CrudQueryManager, ICrudQueryComponent, QueryEventArgs } from 'htmlrapier.widgets/src/CrudQuery';
import * as controller from 'htmlrapier/src/controller';
import { CrudTableRowControllerExtensions, ICrudService, CrudTableRowController } from 'htmlrapier.widgets/src/CrudPage';
import * as client from 'Client/Libs/ServiceClient';

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
        evt.preventDefault();
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