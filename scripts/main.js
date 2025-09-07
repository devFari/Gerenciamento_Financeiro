document.addEventListener('DOMContentLoaded', () => {
    const tipoLancamento = document.getElementById('tipo');
    const camposGastou = document.getElementById('campos-gastou');
    const formaGasto = document.getElementById('forma-gasto');
    const parcelasCredito = document.getElementById('parcelas-credito');
    const formulario = document.getElementById('lancamento-form');

    // Função para mostrar/esconder campos com base no tipo de lançamento
    tipoLancamento.addEventListener('change', (event) => {
        const tipoSelecionado = event.target.value;
        if (tipoSelecionado === 'gastou') {
            camposGastou.classList.remove('hidden');
        } else {
            camposGastou.classList.add('hidden');
            parcelasCredito.classList.add('hidden');
        }
    });

    // Função para mostrar/esconder o campo de parcelas
    formaGasto.addEventListener('change', (event) => {
        const formaSelecionada = event.target.value;
        if (formaSelecionada === 'Credito') {
            parcelasCredito.classList.remove('hidden');
        } else {
            parcelasCredito.classList.add('hidden');
        }
    });

    // Submissão do formulário
    formulario.addEventListener('submit', async (event) => {
        event.preventDefault();

        // Coleta os dados básicos do formulário
        const dados = {
            tipo: tipoLancamento.value,
            data: new Date().toISOString().split('T')[0],
            valor: parseFloat(document.getElementById('valor').value),
            descricao: document.getElementById('descricao').value
        };

        // Adiciona campos específicos com base no tipo de lançamento
        if (dados.tipo === 'gastou') {
            dados.local = document.getElementById('local-gasto').value;
            dados.forma = formaGasto.value;
            if (dados.forma === 'Credito') {
                dados.parcelas = parseInt(document.getElementById('parcelas').value);
            }
        } else if (dados.tipo === 'ganhou') {
            // Lógica para dados de "ganho"
            // Adicionamos um campo 'motivo' para diferenciar os tipos de ganhos
            dados.motivo = 'Salario'; // Você pode adicionar uma nova opção no formulário para escolher o motivo, mas por agora vamos manter fixo.
        }

        console.log('Dados a serem enviados:', dados);

        try {
            const response = await fetch('http://localhost:3000/lancamentos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dados),
            });

            if (response.ok) {
                alert('Dados salvos com sucesso!');
                formulario.reset();
                // Oculta os campos de gasto novamente para a próxima submissão
                camposGastou.classList.add('hidden');
                parcelasCredito.classList.add('hidden');
            } else {
                throw new Error('Erro ao salvar os dados.');
            }

        } catch (error) {
            console.error('Erro:', error);
            alert('Erro ao salvar os dados.');
        }
    });
});