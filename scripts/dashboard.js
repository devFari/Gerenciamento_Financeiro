// scripts/dashboard.js

// Função para carregar os dados do JSON
async function carregarDados() {
    try {
        const response = await fetch('http://localhost:3000/lancamentos');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erro ao carregar os dados:', error);
        return [];
    }
}


// Renderiza o Gráfico de Salários
async function renderizarGraficoSalarios() {
    const dados = await carregarDados();
    const filtro = document.getElementById('filtro-salarios').value;
    const lancamentosSalario = dados.filter(d => d.motivo === 'Salario').slice(-filtro);

    const labels = lancamentosSalario.map(d => d.data);
    const valores = lancamentosSalario.map(d => d.valor);

    const ctx = document.getElementById('salariosChart').getContext('2d');
    
    if (window.salariosChartInstance) {
        window.salariosChartInstance.destroy();
    }

    window.salariosChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Valor Recebido',
                data: valores,
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Função para processar os dados de gastos mensais
function processarGastosMensais(dados) {
    const gastosPorMes = {};

    dados.forEach(lancamento => {
        if (lancamento.tipo === 'gastou') {
            const data = new Date(lancamento.data);
            const mesAno = `${data.getFullYear()}-${(data.getMonth() + 1).toString().padStart(2, '0')}`;
            
            if (!gastosPorMes[mesAno]) {
                gastosPorMes[mesAno] = 0;
            }
            gastosPorMes[mesAno] += lancamento.valor;
        }
    });

    return gastosPorMes;
}

// Renderiza o Gráfico de Gastos por Mês
async function renderizarGraficoGastosMensais() {
    const dados = await carregarDados();
    const gastosAgrupados = processarGastosMensais(dados);

    const labels = Object.keys(gastosAgrupados).sort();
    const valores = labels.map(mes => gastosAgrupados[mes]);

    const ctx = document.getElementById('gastosMensaisChart').getContext('2d');
    
    if (window.gastosMensaisChartInstance) {
        window.gastosMensaisChartInstance.destroy();
    }

    window.gastosMensaisChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Gastos (R$)',
                data: valores,
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return 'R$ ' + value.toLocaleString('pt-BR');
                        }
                    }
                }
            },
            tooltips: {
                callbacks: {
                    label: function(tooltipItem) {
                        return 'R$ ' + tooltipItem.yLabel.toLocaleString('pt-BR');
                    }
                }
            }
        }
    });
}

// Função para processar o saldo líquido mensal
function processarSaldoMensal(dados) {
    const saldoPorMes = {};
    dados.forEach(lancamento => {
        const data = new Date(lancamento.data);
        const mesAno = `${data.getFullYear()}-${(data.getMonth() + 1).toString().padStart(2, '0')}`;
        
        if (!saldoPorMes[mesAno]) {
            saldoPorMes[mesAno] = 0;
        }

        if (lancamento.tipo === 'ganhou') {
            saldoPorMes[mesAno] += lancamento.valor;
        } else if (lancamento.tipo === 'gastou') {
            saldoPorMes[mesAno] -= lancamento.valor;
        }
    });
    return saldoPorMes;
}

// Renderiza o gráfico de saldo líquido mensal
async function renderizarGraficoSaldoMensal() {
    const dados = await carregarDados();
    const saldoAgrupado = processarSaldoMensal(dados);

    const labels = Object.keys(saldoAgrupado).sort();
    const valores = labels.map(mes => saldoAgrupado[mes]);

    const ctx = document.getElementById('saldoMensalChart').getContext('2d');
    
    if (window.saldoMensalChartInstance) {
        window.saldoMensalChartInstance.destroy();
    }

    const backgroundColors = valores.map(valor => valor >= 0 ? 'rgba(40, 167, 69, 0.7)' : 'rgba(220, 53, 69, 0.7)');
    const borderColors = valores.map(valor => valor >= 0 ? 'rgba(40, 167, 69, 1)' : 'rgba(220, 53, 69, 1)');

    window.saldoMensalChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Saldo Líquido (R$)',
                data: valores,
                backgroundColor: backgroundColors,
                borderColor: borderColors,
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Função para processar os dados de gastos por banco
function processarGastosPorBanco(dados) {
    const gastosPorBanco = {};
    dados.forEach(lancamento => {
        if (lancamento.tipo === 'gastou' && lancamento.local) {
            if (!gastosPorBanco[lancamento.local]) {
                gastosPorBanco[lancamento.local] = 0;
            }
            gastosPorBanco[lancamento.local] += lancamento.valor;
        }
    });
    return gastosPorBanco;
}

// Renderiza o Gráfico de Gastos por Banco (agora com as cores corretas)
async function renderizarGraficoGastosPorBanco() {
    const dados = await carregarDados();
    const gastosAgrupados = processarGastosPorBanco(dados);

    const labels = Object.keys(gastosAgrupados);
    const valores = labels.map(banco => gastosAgrupados[banco]);

    const cores = {
        'Nubank': '#820ad1',
        'Pic Pay': '#21c25e',
        'Itaú': '#000066',
        'C6 Bank': '#121212',
        'Inter': '#fc6800',
        'Pluxee': '#ff7277'
    };

    const backgroundColors = labels.map(label => cores[label] || 'rgba(0, 0, 0, 0.7)');

    const ctx = document.getElementById('gastosPorBancoChart').getContext('2d');
    
    if (window.gastosPorBancoChartInstance) {
        window.gastosPorBancoChartInstance.destroy();
    }

    window.gastosPorBancoChartInstance = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                data: valores,
                backgroundColor: backgroundColors,
                borderColor: '#ffffff',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    callbacks: {
                        label: function(tooltipItem) {
                            const total = tooltipItem.chart.data.datasets[0].data.reduce((acc, curr) => acc + curr, 0);
                            const porcentagem = ((tooltipItem.raw / total) * 100).toFixed(2);
                            return `${tooltipItem.label}: R$ ${tooltipItem.raw.toLocaleString('pt-BR')} (${porcentagem}%)`;
                        }
                    }
                }
            }
        }
    });
}

// Função para processar o total investido por banco
function processarInvestimentoPorBanco(dados) {
    const investimentoPorBanco = {};
    dados.forEach(lancamento => {
        if (lancamento.tipo === 'gastou' && lancamento.forma === 'Investimento') {
            const local = lancamento.local;
            if (!investimentoPorBanco[local]) {
                investimentoPorBanco[local] = 0;
            }
            investimentoPorBanco[local] += lancamento.valor;
        }
    });
    return investimentoPorBanco;
}

// Renderiza o gráfico de total investido por banco
async function renderizarGraficoInvestimentoPorBanco() {
    const dados = await carregarDados();
    const dadosInvestimento = processarInvestimentoPorBanco(dados);

    const labels = Object.keys(dadosInvestimento);
    const valores = labels.map(banco => dadosInvestimento[banco]);

    const cores = {
        'Nubank': '#820ad1',
        'Pic Pay': '#21c25e',
        'Itaú': '#000066',
        'C6 Bank': '#121212',
        'Inter': '#fc6800',
        'Pluxee': '#ff7277'
    };

    const backgroundColors = labels.map(label => cores[label] || 'rgba(0, 0, 0, 0.5)');

    const ctx = document.getElementById('investimentoPorBancoChart').getContext('2d');

    if (window.investimentoPorBancoChartInstance) {
        window.investimentoPorBancoChartInstance.destroy();
    }

    window.investimentoPorBancoChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Valor Investido (R$)',
                data: valores,
                backgroundColor: backgroundColors,
                borderColor: backgroundColors.map(color => color.replace('0.7', '1')),
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}

// Calcula e exibe o total de investimentos
async function exibirTotalInvestido() {
    const dados = await carregarDados();
    const totalInvestido = dados
        .filter(dado => dado.forma === 'Investimento')
        .reduce((total, dado) => total + dado.valor, 0);
    
    document.getElementById('total-investido-valor').textContent = `R$ ${totalInvestido.toFixed(2).replace('.', ',')}`;
}

function processarSalarioVsInvestimento(dados) {
    const dadosAgrupados = {};

    dados.forEach(lancamento => {
        const data = new Date(lancamento.data);
        const mesAno = `${data.getFullYear()}-${(data.getMonth() + 1).toString().padStart(2, '0')}`;

        if (!dadosAgrupados[mesAno]) {
            dadosAgrupados[mesAno] = { salario: 0, investimento: 0 };
        }

        if (lancamento.tipo === 'ganhou' && lancamento.motivo === 'Salario') {
            dadosAgrupados[mesAno].salario += lancamento.valor;
        } else if (lancamento.tipo === 'gastou' && lancamento.forma === 'Investimento') {
            dadosAgrupados[mesAno].investimento += lancamento.valor;
        }
    });

    return dadosAgrupados;
}

async function renderizarGraficoSalarioVsInvestimento() {
    const dados = await carregarDados();
    const dadosAgrupados = processarSalarioVsInvestimento(dados);

    // Converte o objeto em arrays para Chart.js
    const labels = Object.keys(dadosAgrupados).sort();
    const salarios = labels.map(mes => dadosAgrupados[mes].salario);
    const investimentos = labels.map(mes => dadosAgrupados[mes].investimento);

    const ctx = document.getElementById('salarioVsInvestimentoChart').getContext('2d');

    // Destroi o gráfico anterior se existir
    if (window.salarioVsInvestimentoChartInstance) {
        window.salarioVsInvestimentoChartInstance.destroy();
    }

    window.salarioVsInvestimentoChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Salário Recebido',
                data: salarios,
                borderColor: 'rgba(54, 162, 235, 1)',
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderWidth: 2,
                fill: false,
                tension: 0.1
            }, {
                label: 'Investimento Total',
                data: investimentos,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderWidth: 2,
                fill: false,
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Função para calcular e exibir o total de gastos do mês atual
async function exibirTotalGastosMes() {
    const dados = await carregarDados();
    
    // Obtém o mês e ano atuais
    const dataAtual = new Date();
    const mesAtual = dataAtual.getMonth();
    const anoAtual = dataAtual.getFullYear();

    // Filtra e soma os gastos do mês atual
    const totalGastos = dados
        .filter(lancamento => {
            const dataLancamento = new Date(lancamento.data);
            return lancamento.tipo === 'gastou' && 
                   dataLancamento.getMonth() === mesAtual && 
                   dataLancamento.getFullYear() === anoAtual;
        })
        .reduce((total, lancamento) => total + lancamento.valor, 0);

    // Formata o valor e atualiza o HTML
    document.getElementById('total-gastos-mes-valor').textContent = `R$ ${totalGastos.toFixed(2).replace('.', ',')}`;
}

// Chame a nova função ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    // ... (chamadas de outras funções) ...

    exibirTotalGastosMes(); // Adicione esta linha
    
    // ... (resto do código) ...
});

// Função para processar e projetar as parcelas futuras
function processarParcelasFuturas(dados) {
    const parcelasPorMes = {};
    const hoje = new Date();

    dados.forEach(lancamento => {
        if (lancamento.tipo === 'gastou' && lancamento.forma === 'Credito' && lancamento.parcelas > 1) {
            const valorParcela = lancamento.valor / lancamento.parcelas;
            const dataLancamento = new Date(lancamento.data);

            for (let i = 0; i < lancamento.parcelas; i++) {
                const dataParcela = new Date(dataLancamento);
                dataParcela.setMonth(dataParcela.getMonth() + i);

                // Apenas considera parcelas a partir do mês atual ou meses futuros
                if (dataParcela >= hoje || (dataParcela.getFullYear() === hoje.getFullYear() && dataParcela.getMonth() === hoje.getMonth())) {
                    const mesAno = `${dataParcela.getFullYear()}-${(dataParcela.getMonth() + 1).toString().padStart(2, '0')}`;
                    
                    if (!parcelasPorMes[mesAno]) {
                        parcelasPorMes[mesAno] = 0;
                    }
                    parcelasPorMes[mesAno] += valorParcela;
                }
            }
        }
    });
    
    return parcelasPorMes;
}

// Função para renderizar o gráfico de impacto das parcelas
async function renderizarGraficoParcelas() {
    const dados = await carregarDados();
    const parcelasAgrupadas = processarParcelasFuturas(dados);

    const labels = Object.keys(parcelasAgrupadas).sort();
    const valores = labels.map(mes => parcelasAgrupadas[mes]);

    const ctx = document.getElementById('parcelasChart').getContext('2d');
    
    if (window.parcelasChartInstance) {
        window.parcelasChartInstance.destroy();
    }

    window.parcelasChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Total de Parcelas Ativas (R$)',
                data: valores,
                backgroundColor: '#0097b28f',
                borderColor: '#0097b2ff',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Chama as funções para renderizar ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    renderizarGraficoSalarios();
    exibirTotalInvestido();
    renderizarGraficoGastosMensais();
    renderizarGraficoGastosPorBanco();
    renderizarGraficoSaldoMensal();
    renderizarGraficoInvestimentoPorBanco();
    renderizarGraficoSalarioVsInvestimento();
    renderizarGraficoParcelas();

    document.getElementById('filtro-salarios').addEventListener('change', renderizarGraficoSalarios);
});