// Função para formatar em moeda brasileira
function formatarMoeda(valor) {
    const v = valor.replace(/\D/g, '');
    const valorNumerico = (parseInt(v) / 100).toFixed(2);
    return valorNumerico.replace('.', ',');
}

// Função para formatar input como moeda
function mascaraMoeda(event) {
    const input = event.target;
    let valor = input.value.replace(/\D/g, '');
    
    if (valor.length === 0) {
        input.value = '';
        return;
    }

    valor = (parseInt(valor) / 100).toFixed(2);
    input.value = `R$ ${valor.replace('.', ',')}`;
}

// Função para converter valor formatado em número
function converterParaNumero(valor) {
    if (!valor) return 0;
    return Number(valor.replace(/[^0-9,-]/g, '').replace(',', '.'));
}

// Adicionar eventos aos campos de moeda
document.addEventListener('DOMContentLoaded', function() {
    const camposMoeda = document.querySelectorAll('.money');
    
    camposMoeda.forEach(campo => {
        campo.addEventListener('input', mascaraMoeda);
    });
});

function calcular() {
    // Obtendo os valores dos inputs e convertendo para número
    const valorCompanhia = converterParaNumero(document.getElementById('valorCompanhia').value);
    const quantidadePontos = parseInt(document.getElementById('quantidadePontos').value) || 0;
    const valorPontos = converterParaNumero(document.getElementById('valorPontos').value);
    const taxaEmbarque = converterParaNumero(document.getElementById('taxaEmbarque').value);

    // Calculando o valor mínimo (apenas taxa de embarque + valor dos pontos)
    const valorMinimo = taxaEmbarque + (quantidadePontos * valorPontos);

    // Calculando o valor médio (média entre valor mínimo e valor da companhia + taxa)
    const valorMedio = (valorMinimo + (valorCompanhia + taxaEmbarque)) / 2;

    // Formatando os valores para o padrão brasileiro (R$ X.XXX,XX)
    const formatoBRL = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });

    // Atualizando os resultados na tela com formato em Reais
    document.getElementById('valorMinimo').textContent = formatoBRL.format(valorMinimo);
    document.getElementById('valorMedio').textContent = formatoBRL.format(valorMedio);
} 