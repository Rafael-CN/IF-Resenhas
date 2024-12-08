export class Cachorro {
    public id: string;
    public nome: string;
    public raca: string;
    public pelo: string;
    public sexo: string;
    public datanasc: string;
    public urlfoto: string;

    constructor(obj?: Partial<Cachorro>) {
        if (obj) {
            Object.assign(this, obj);
        }
    }

    toString() {
        const objeto = `{
            "id":       "${this.id}",
            "nome":     "${this.nome}",
            "raca":     "${this.raca}",
            "pelo":     "${this.pelo}",
            "sexo":     "${this.sexo}",
            "datanasc": "${this.datanasc}",
            "urlfoto":  "${this.urlfoto}"
        }`;
        return objeto;
    }

    toFirestore() {
        return { ...this };
    }
}
