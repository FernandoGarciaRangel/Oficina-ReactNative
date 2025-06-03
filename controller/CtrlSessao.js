export default class CtrlSessao {
    #daoUsuario;
    
    constructor() {
        this.init();
    }
    
    async init() {
    
    }

    async verificandoLogin() {
        return new Promise((resolve,reject) => {    
          const auth = getAuth(app);
          auth.setPersistence(browserSessionPersistence);
          onAuthStateChanged(auth, async (user) => {
            if (user) {        
              this.#daoUsuario = new DaoUsuario();
              let usrSistema = await this.#daoUsuario.obterUsuarioPeloUID(user.uid);
              if(usrSistema == null) {
                await this.#daoUsuario.incluir(new Usuario(user.email, user.uid));
                reject('A conta "' + user.email + '" não foi habilitada para usar este sistema');
              } else {
                if(usrSistema.getFuncao() == 'INABILITADO')
                  reject('O Administrador não concedeu à conta "' + user.email + '"(' + user.uid + ') acesso ao sistema');
                resolve(user);
              }
            } else {
              reject('Você não realizou a autenticação via Google');
            }
          });
        });
    }
}
