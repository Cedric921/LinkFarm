import Permission from 'App/Models/Permission'
import Role from 'App/Models/Role'
import RolePermission from 'App/Models/RolePermission'
import { EPermision } from 'App/Utils/Enums'
// import Search from 'App/Models/Search'
// import SpecialPermission from 'App/Models/SpecialPermission'
import * as i from 'interfaces'

export default class Utils {
  private static _instance: Utils

  public static get Instance() {
    // Do you need arguments? Make it a regular static method instead.
    return this._instance || (this._instance = new this())
  }

  // public async add_search(input: Partial<Search>) {
  //   await Search.create(input)
  // }

  // R O L E
  public async findRole(params: i.Ifind): Promise<Role | null> {
    return await Role.query().where(params.key, params.value).first()
  }

  public async getAllRole(params: i.Iquery): Promise<Role[]> {
    return await Role.query().orderBy(params.orderBy!, 'desc').paginate(params.offset, params.limit)
  }

  public async registreRole(input: i.Irole): Promise<Role> {
    return await Role.create(input)
  }

  public async updateRole(
    id: string,
    input: Partial<Omit<i.Irole, 'enterprise_id'>>
  ): Promise<Role | null> {
    await Role.query().where('id', id).update(input, ['*']).first()
    return await Role.query().where('id', id).first()
  }

  public async destroyRole(id: string): Promise<Role | null> {
    return await Role.query().where('id', id).delete().first()
  }

  // P E R M I S S I O N

  public async findPermission(params: i.Ifind): Promise<Permission | null> {
    return Permission.findBy(params.key, params.value)
  }

  public async getAllPermission(params: i.IpermissionQuery) {
    return await Permission.query()
      .if(params.module, (query) => {
        query.where('module', params.module)
      })
      .orderBy('created_at', 'desc')
  }

  public async registrePermission(input: i.Ipermission): Promise<Permission> {
    return Permission.create(input)
  }

  public async updatePermission(
    id: string,
    input: Pick<i.Ipermission, 'description'>
  ): Promise<Permission | null> {
    return await Permission.query()
      .where('id', id)
      .update({ description: input.description }, ['*'])
      .first()
  }

  public async destroyPermission(id: string): Promise<Permission | null> {
    return Permission.query().where('id', id).delete().first()
  }

  // R O L E - P E R M I S S I O N

  public async findRolePermission(
    params: i.Ifind
    // enterprise_id: string
  ): Promise<RolePermission[]> {
    return await RolePermission.query().where(params.key, params.value)
  }

  public async getAllRolePermission(params: i.IrolePermissionQuery): Promise<RolePermission[]> {
    return await RolePermission.query()
      .if(params.roleId, (query) => {
        query.where('role_id', params.roleId!)
      })
      // .withScopes((scopes) => {
      //   scopes.search(params.q!);
      // })
      .orderBy('created_at', 'desc')
      .paginate(params.offset, params.limit)
  }

  public async givePermissionToRole(input: i.IrolePermission[]): Promise<RolePermission[]> {
    return await RolePermission.createMany(input)
  }

  public async deleteRolePermission(id: string): Promise<RolePermission> {
    return await RolePermission.query().where('id', id).delete().first()
  }

  // INIT VALUE
  public async giveAllPermissions(role_id: string) {
    try {
      const permission = await Permission.query()
      const input: { roleId: string; permissionId: string }[] = []
      permission.map((item) => input.push({ roleId: role_id, permissionId: item.id }))

      if (input.length) await RolePermission.createMany(input)
    } catch (error) {}
  }

  public async createModulePermissions(module: string): Promise<Permission[] | undefined> {
    try {
      const find = await Permission.query().where('module', module).first()

      if (find) {
        return
      }
      const permissions: { module: string; designation: string }[] = []
      Object.values(EPermision).map((item) =>
        permissions.push({ module, designation: `${item}_${module}` })
      )

      return await Permission.createMany(permissions)
    } catch (error) {
      console.log(error.message)
    }
  }
}
