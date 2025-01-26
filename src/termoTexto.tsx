export const termoTexto = (
  nome: string,
  cpf: string,
  cnpj: string,
  notebook: string,
  monitor: string,
  celular: string,
  mouse: string,
  teclado: string,
) => {
  // Função para garantir que valores vazios ou undefined não sejam exibidos
  const safeValue = (value: any, label: any) => value ? `${label} ${value}` : '';
  const safeValueTxt = (value: any, label: any) => value ? `${label} ${nome}` : '';
  const safeValueAss = (value: any, label: any) => value ? `${label} ${value}` : `CPF ${cpf}`;

  const replaceTrueForMouse = (mouse: any) => {
        if (mouse === true) {
            mouse = 'SIM';
        }
    return mouse;
};
const getTodayDate = () => {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, '0'); // Adiciona 0 à esquerda, se necessário
  const month = String(today.getMonth() + 1).padStart(2, '0'); // Meses começam do 0, por isso somamos 1
  const year = today.getFullYear();
  
  return `${day}/${month}/${year}`;
};

const replaceTrueForTeclado = (teclado: any) => {
  if (teclado === true) {
      teclado = 'SIM';
  }
return teclado;
};
  return `



TERMO DE RESPONSABILIDADE PELA GUARDA E USO DE EQUIPAMENTOS

Contratado ${nome}, ${safeValue(cnpj, 'CNPJ:')} ${safeValueTxt(cnpj, 'sendo representada por')} CPF: ${cpf}, responsabiliza-se por eventuais danos causados diretamente a Afs Locações Ltda ou a terceiros, decorrentes de minha culpa ou dolo, durante todo o período em que o(s) bem (ns) acima especificados ficarem sob a minha guarda e utilização, bem como declaro ciência das seguintes condições:

O equipamento cedido a título de empréstimo, sendo de propriedade da Afs Locações Ltda;

Em situações de roubo, furto ou extravio deverá informar imediatamente à gerência Administrativa e Financeira e providenciar boletim de ocorrência policial.

Em casos de danos no equipamento, deverá notificar à gerência, devendo está avaliar o dano, se o mesmo pode ser reparado ou se o bem deverá ser substituido, bem como avaliar o valor a ser ressarcido;

Não sendo mais necessário seu uso, ou nas situações de distrato desta empresa, o equipamento deverá ser devolvido à gerência, em perfeito estado de conservação, considerando o tempo de uso.

Para equipamentos de informática:

Poderá ser solicitada, a qualquer momento, a devolução temporária do equipamento para que a TI faça verificações e/ou atualizações de programas. Tão logo a ação seja finalizada o equipamento será devolvido;

Poderão ser utilizados neste equipamento apenas sistemas, programas ou qualquer tipo de aplicativos que estão em conformidade com as leis brasileiras, e previamente autorizados pela Afs Locações Ltda;

É proibido baixar programas e jogos, acessar sites que não sejam para o desenvolvimento dos trabalhos de interesse da empresa Afs Locações Ltda.

Comprometo-me a atender todas as orientações dadas pela a empresa para assim desenvolver a prestação de serviço da melhor forma possível.

Recebo os itens elencados de acordo com as fotos tiradas no ato da entrega dos mesmos.

  ___________________________________________
  ${nome}, ${safeValueAss(cnpj, 'CNPJ:')} 
  Atestamos o recebimento em ${getTodayDate()}, nas seguintes condições acima citadas

${safeValue(notebook, 'Patrimônio Notebook N:')}
${safeValue(monitor, 'Patrimônio Monitor N:')}
${safeValue(celular, 'Patrimônio Celular N:')}
${safeValue(replaceTrueForMouse(mouse), 'Mouse:')}
${safeValue(replaceTrueForTeclado(teclado), 'Teclado:')}
  `;
};

export default termoTexto;
