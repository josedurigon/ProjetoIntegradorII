const {calcularArea} = require('../public/javascripts/exemplo');

describe('Teste exemplo 3', () => {

    test('Funcao calcularArea', ()=>{
        expect(calcularArea('a',3)).toBeNaN();
    })

})
