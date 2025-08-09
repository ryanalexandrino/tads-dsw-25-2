document.addEventListener('DOMContentLoaded', function() {
    const botaoCarregar = document.getElementById('botaoCarregar');
    const containerCurriculo = document.getElementById('containerCurriculo');

    botaoCarregar.addEventListener('click', async function() {
        try {
            // Fazer fetch do arquivo JSON
            const response = await fetch('dados.json');

            if (!response.ok) {
                throw new Error('Erro ao carregar dados');
            }

            const dados = await response.json();
            
            // Preencher informações pessoais
            document.getElementById('nomeCompleto').textContent = dados.informacoesPessoais.nomeCompleto;
            document.getElementById('dataNascimento').textContent = dados.informacoesPessoais.dataNascimento;
            document.getElementById('emailContato').textContent = dados.informacoesPessoais.emailContato;
            document.getElementById('telefoneContato').textContent = dados.informacoesPessoais.telefoneContato;
            document.getElementById('linkedinPerfil').textContent = dados.informacoesPessoais.linkedinPerfil;
            document.getElementById('githubPerfil').textContent = dados.informacoesPessoais.githubPerfil;
            
            // Preencher habilidades
            const listaHabilidades = document.getElementById('listaHabilidades');
            listaHabilidades.innerHTML = dados.habilidades.map(habilidade => 
                `<div style="margin-bottom: 8px; font-size: 14px;">• ${habilidade}</div>`
            ).join('');
            
            // Preencher experiências
            const listaExperiencias = document.getElementById('listaExperiencias');
            listaExperiencias.innerHTML = dados.experiencias.map(exp => `
                <div class="item-experiencia">
                    <div class="titulo-item">${exp.titulo}</div>
                    <div class="empresa-item">${exp.empresa}</div>
                    <div class="periodo-item">${exp.periodo}</div>
                    <div class="descricao-item">${exp.descricao}</div>
                </div>
            `).join('');
            
            // Preencher educação
            const listaEducacao = document.getElementById('listaEducacao');
            listaEducacao.innerHTML = dados.educacao.map(edu => `
                <div class="item-educacao">
                    <div class="titulo-item">${edu.titulo}</div>
                    <div class="instituicao-item">${edu.instituicao}</div>
                    <div class="periodo-item">${edu.periodo}</div>
                    <div class="descricao-item">${edu.descricao}</div>
                </div>
            `).join('');
            
            // Esconder botão e mostrar currículo
            botaoCarregar.style.display = 'none';
            containerCurriculo.style.display = 'block';
            
        } catch (error) {
            console.error('Erro ao carregar currículo:', error);
            alert('Erro ao carregar o currículo. Tente novamente.');
        }
    });
});