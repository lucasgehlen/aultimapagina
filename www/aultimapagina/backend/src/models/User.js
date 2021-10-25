class User {
    constructor(id, name, email, cellphone, password, role, created_at, updated_at) {
        this.id = id;
        this.email = email;
        this.name = name;
        this.cellphone = cellphone;
        this.password = password;
        this.role = role;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }

}
  
module.exports = { User }