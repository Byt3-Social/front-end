import { Mask } from "maska";

export default {
    cnpjMask(cnpj) {
        var mask = new Mask({ mask: "##.###.###/####-##" });

        return mask.masked(cnpj);
    },

    cpfMask: function (cpf) {
        var mask = new Mask({ mask: "###.###.###-##" });

        return mask.masked(cpf);
    },
    
    telefoneMask: function (telefone) {
        var mask = new Mask({ mask: ["(##) ####-####", "(##) #####-####"] });

        return mask.masked(telefone);
    },
}