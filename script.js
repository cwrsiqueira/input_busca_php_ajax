const mapaAcentos = {
    à: 'a', á: 'a', â: 'a', ä: 'a', ã: 'a',
    è: 'e', é: 'e', ê: 'e', ë: 'e',
    ì: 'i', í: 'i', î: 'i', ï: 'i',
    ò: 'o', ó: 'o', ô: 'o', ö: 'o', õ: 'o',
    ù: 'u', ú: 'u', û: 'u', ü: 'u',
};
let input_field = document.querySelector("input[name=busca]");
var data;

input_field.addEventListener('keyup', async function (e) {
    const busca = e.target.value;
    const res = filtroPorNome(data, busca);
    montaTabela(res);
});

function filtroPorNome(array, termo) {
    termo = termo
        .toLowerCase()
        .replace(/[àáâãäåèéêëìíîïòóôöùúûü]/g, (match) => mapaAcentos[match] || match)
        .replace(/[^a-z0-9]/gi, '');
    return array.filter(item => {
        let nome = item.nome
            .toLowerCase()
            .replace(/[àáâãäåèéêëìíîïòóôöùúûü]/g, (match) => mapaAcentos[match] || match)
            .replace(/[^a-z0-9]/gi, '');
        console.log(nome, termo);
        const nomeEncontrado = nome.toLowerCase().includes(termo);
        return nomeEncontrado;
    });
}

const montaTabela = (data) => {
    let html = '';
    data.map(function (item) {
        html += "<tr>";
        html += `<td>${item.id}</td>`;
        html += `<td>${item.nome}</td>`;
        html += `<td><a title="Editar" href="editar?id=${item.id}"><i class="fa-solid fa-pen-to-square text-info"></i></a></td>`;
        html += `<td><a title="Excluir" href="excluir?id=${item.id}"><i class="fa-solid fa-pen-to-square text-danger"></i></a></td>`;
        html += "</tr>";
    });
    document.querySelector("#body_table").innerHTML = html;
}

function pegar_dados(busca) {
    let ajax = new XMLHttpRequest();

    ajax.open("GET", `http://localhost/projetos_youtube/input_busca_php/pegar-dados.php?busca=${busca}`);

    ajax.onreadystatechange = () => {
        if (ajax.readyState == 4) {
            if (ajax.status == 200) {
                data = JSON.parse(ajax.responseText);
                montaTabela(data);
            }
        }
    };

    ajax.send();
}

pegar_dados('');