import * as client from 'clientlibs.ServiceClient';
import * as hyperCrud from 'hr.widgets.HypermediaCrudService';
import * as di from 'hr.di';
import { CrudQueryManager } from 'hr.widgets.CrudQuery';

export class PathInfoCrudInjector extends hyperCrud.AbstractHypermediaPageInjector {
    public static get InjectorArgs(): di.DiFunction<any>[] {
        return [client.EntryPointInjector, CrudQueryManager];
    }

    constructor(private injector: client.EntryPointInjector, private queryManager: CrudQueryManager) {
        super();
    }

    async list(query: any): Promise<hyperCrud.HypermediaCrudCollection> {
        var entry = await this.injector.load();
        return entry.listPathInfos(query);
    }

    async canList(): Promise<boolean> {
        var entry = await this.injector.load();
        return entry.canListPathInfos();
    }

    public getDeletePrompt(item: client.PathInfoResult): string {
        return "Delete " + item.data.path + "?";
    }

    public getItemId(item: client.PathInfoResult): string | null {
        return String(item.data.path);
    }

    public createIdQuery(id: string): client.PathInfoQuery | null {
        return {
            path: id
        };
    }

    public async getDefaultAddObject(): Promise<client.PathInfoInput> {
        return Promise.resolve<client.PathInfoInput>({
            path: (<client.PathInfoQuery>this.queryManager.setupQuery()).directory
        });
    }
}