import { useSelector } from 'react-redux'
import Image from 'next/image'

import { C, R, Section, Chapter } from 'core/components'

import { PageType, RootState } from 'core/types'
import { InlineListPT } from 'core/components/widgets/inline-list'

export const Page: PageType = () => {
    const inventory = useSelector((state: RootState) => state.inventory.present)
    const clothes = inventory.clothes?.split(' ').slice(-2)[0]
    return (
        <Chapter filename="prólogo">
            <Section>
                <h2>Prólogo</h2>
                <h3>Na tua sala de leitura</h3>
                <p>"Procuras a sabedoria dos anciões? Avança!"</p>
                <p>
                    Após uma breve hesitação, a cortina de contas abre-se para deixar entrar o
                    próximo cliente. Algumas contas soltas caem e rolam até aos cantos.
                </p>
                <p>
                    Devias mesmo arranjar uma cortina nova, mas o quarto é escuro e os teus clientes
                    nem parecem notar. Estão à espera de ver as armadilhas habituais duma vidente de
                    praia: baralhos de tarô, pinturas do zodíaco, uma bola de cristal absurdamente
                    grande. Este cliente parece satisfeito com a fachada, e senta-se à tua frente,
                    do outro lado da mesa redonda atafulhada. Os vossos joelhos quase que se tocam;
                    este quarto não foi feito para dois homens adultos.
                </p>
                <p>
                    “Veio para uma leitura?” perguntas em tom solene. O cliente assentiu com a
                    cabeça.
                </p>
                <p>
                    "Comecemos, então. Alguns alcançam os espíritos através da palma da mão ou das
                    cartas. Eu preciso dum objeto pessoal, um infundido com os próprios espíritos."
                </p>
                <p>
                    Inspecionas o cliente, que traz{' '}
                    <C
                        options={[
                            ['roupas típicas de turista'],
                            ['um anel barato', 'um impermeável sujo', 'um boné de beisebol']
                        ]}
                        last="um olhar impaciente"
                        widget={InlineListPT}
                        tag="clothes"
                    />
                    .
                </p>
            </Section>
            <Section>
                <p>
                    “Há uma poderosa força psíquica a emanar do {clothes},” dizes. “Posso pegar
                    nele?” O cliente entrega-to, de olhos arregalados. Fechas os olhos e rodas o{' '}
                    {clothes} lentamente entre as tuas mãos. “
                    <R
                        tag="clothes"
                        options={{
                            anel: 'Há alguém próximo de si. Alguém que você achava que iria ficar consigo para sempre. Mas já não está entre nós.',
                            impermeável:
                                'As suas férias não correram como esperava. Estou a sentir desapontamento, talvez até desespero.',
                            boné: 'Gosta de se divertir, é um tipo despreocupado com sentido de humor. Mas não se tem rido muito ultimamente.'
                        }}
                    />
                    ” Franzes a testa. “Os espíritos querem ajudar, mas parece que os sinais estão
                    fracos—” Quando o homem não responde, abres um olho e clareias a garganta. O
                    tipo rapidamente saca outra nota de vinte.
                </p>
                <p>
                    “Vejo um nome,” continuas. “Começa com um S—” Ele olha-te sem expressão. “Ou
                    será com um N?” O homem anima-se. Franzes a testa, fingindo uma profunda
                    concentração. “
                    <C options={[['Nancy?'], ['Nadine?']]} last="Nicky?" tag="p0_customer_names" />”
                </p>
            </Section>
            <Section>
                <p>“—Nicholas?” sugere ele excitadamente. “Será o meu pai?”</p>
                <p>
                    “Talvez,” esquivas-te. “
                    <R
                        tag="clothes"
                        options={{
                            anel: 'Ele aprovou o seu casamento? Sinto preocupação pela forma como tudo se passou.',
                            impermeável:
                                'Como se sentiria ele ao saber que fez esta viagem tão longa para me ver?',
                            boné: 'Ele nunca riu o suficiente, pois não?'
                        }}
                    />
                    ”
                </p>
                <p>
                    “Ele não gostava de{' '}
                    <R
                        tag="clothes"
                        options={{
                            anel: 'a Janet. Nunca lhe deu uma oportunidade,',
                            impermeável:
                                'frivolidades nem de férias. Nunca quis que eu me divertisse,',
                            boné: '‘frivolidades’, como ele dizia. Nunca gostou das minhas piadas,'
                        }}
                    />
                    ” diz com amargura.
                </p>
                <p>“Sim, e está arrependido de se ter comportado assim.”</p>
                <p>“A sério?“ O cliente franze o rosto. “Isso não parece nada uma coisa dele.”</p>
                <p>
                    “O mundo do Além transforma uma pessoa,” afirmas, contornando a sua objeção.
                    Analisas{' '}
                    <C
                        options={[
                            ['a sua aparência física'],
                            ['a cara por barbear', 'as mãos calejadas', 'o escaldão a pelar']
                        ]}
                        last="a sua aparência física e consegues algumas pistas"
                        tag="p0_customer_body"
                        widget={InlineListPT}
                    />
                    .
                </p>
            </Section>
            <Section>
                <p>
                    “
                    <R
                        tag="p0_customer_body"
                        options={{
                            cara: 'Ele está preocupado que não ande a dormir bem',
                            mãos: 'Ele está orgulhoso de o filho trabalhar com as mãos',
                            escaldão: 'Ele está contente que esteja a passar tempo ao ar livre'
                        }}
                    />
                    ,” improvisas.
                </p>
                <p>“É verdade, tenho sido—”</p>
                <p>
                    Mas o teu triunfo é sol de pouca dura, pois inesperadamente a cortina agita-se
                    de novo. Uma mulher adentra-se pelo quarto: quarentona, toda pão-pão,
                    queijo-queijo... um bocadinho desleixada para o teu gosto. A sua expressão azeda
                    diz-te que não se trata de uma potencial cliente. Não te surpreende quando
                    mostra um distintivo ao cliente e diz “Saia.”
                </p>

                <p>
                    O homem quase que salta do assento e apressadamente recolhe as suas coisas,
                    envergonhado. “Pode ficar se quiser,” dizes-lhe, mas em vão, o tipo só se quer
                    pôr a milhas. Passa de fininho pela mulher — a agente de polícia — que o observa
                    com um misto de pena e de desprezo. O homem está com tanta pressa que nem se
                    lembra de levar o dinheiro extra que deixou na mesa e que tu enfias
                    sorrateiramente no bolso, aproveitando um momento de distração. O {clothes}{' '}
                    também ficou esquecido.
                </p>
                <p>
                    Ficas sozinho com a polícia. Provavelmente veio para te atormentar por causa de
                    arrependimentos alheios: uma denúncia de alguém que foi enganado, que tu não os
                    informaste vezes suficientes de que era uma coisa “apenas para fins de
                    entretenimento”, que o marido ou a mulher descobriu, coisas do tipo. Não
                    acontece com frequência, mas acontece. É melhor deixar a conversa correr
                    normalmente: começar com simpatia, manter a formalidade.
                </p>
                <p>
                    “Em que posso ajudá-la, senhora agente?” perguntas. E então ela responde duma
                    forma que nem tu podias ter previsto.
                </p>
                <p>
                    “É Inspetora. E preciso de um médium,” diz ela, entregando-te o seu{' '}
                    <C
                        options={[['cartão']]}
                        last="cartão, que viras e lês: <em>Tamisha Whitby, Investigações Criminais, Condado de Cape May, NJ</em>"
                        tag="p0_nextUnit"
                    />
                    .
                </p>
            </Section>
            <Section>
                <hr />
                <p>
                    Esperas que ela corte o ambiente pesado com uma piada, mas nada, fica ali
                    apenas, a estudar-te. Podes ser um charlatão, mas não és malcriado. “Frank
                    Petrio,” apresentas-te, estendendo a tua mão carnuda.
                </p>

                <p>
                    Ela aperta-a e mostra um dos teus cartões de visita. “Não o{' '}
                    <i>Grande Francisco</i>?”
                </p>
                <p>
                    Encolhes os ombros e apontas para a tabuleta por cima da porta: “
                    <small>Apenas para fins de entretenimento</small>.” Os dois sentam-se.
                </p>
                <p>
                    Ela diz, “Não acredito em adivinhos nem em médiuns nem em coisas do género.
                    Estou aqui a fazer um favor a uma pessoa.” Ela olha-te tão fixamente que não
                    consegues esconder o teu incómodo. Deve ser assim que os teus clientes se
                    sentem. “Houve uma morte, no mês passado, em Stone Harbor, um homem idoso
                    chamado Alan Healey. Talvez tenha lido qualquer coisa sobre isso; veio nos
                    jornais.”
                </p>

                <p>
                    “É agosto, aqui no passeio marítimo,” respondes. “Tenho estado cheio de
                    trabalho.”
                </p>

                <p>
                    Ela olha criticamente em torno da sala de leitura e não é preciso ser-se médium
                    para saber o que ela pensa sobre a tua opção de carreira. Ela tira uma pasta e
                    começa a ler. “Healey foi encontrado morto em casa, após ter ingerido uma
                    sobredosagem do medicamento que tomava para a hipertensão arterial. Os Healeys
                    são uma família antiga e abastada na cidade, por isso a história recebeu
                    bastante atenção dos meios de comunicação locais.”
                </p>

                <p>
                    Stone Harbor é uma vila lindíssima, próspera, muito bem planeada, que fica
                    apenas a uns quinze minutos e a uma catrefada de quilómetros da feira popular
                    que é a cidade operária em que vives. “Desculpe. O que tem tudo isso a ver
                    comigo?”
                </p>
                <p>
                    “Healey tem uma jovem sobrinha que estava a morar com ele na altura. É minha
                    afilhada. A mãe dela já está fora da equação, mas sei que ela gostaria de — quer
                    dizer — acho...” A detetive parece incomodada, como muitos dos teus clientes no
                    início. “Ela é uma pessoa muito... espiritual. Ela tende a acreditar.” Whitby
                    pára de novo.
                </p>

                <p>“Ou seja uma ingénua,” dizes.</p>
                <p>
                    A inspetora olha-te com irritação. “Quero tanto estar aqui quanto você me quer
                    cá. Ele era um velho com uma visão débil que leu mal a dosagem. Estou a fazer um
                    favor a uma velha amiga e—” Ela leva a mão ao bolso à procura de qualquer coisa.
                    “Allison, a minha amiga, disse-me que se algum acontecimento violento se
                    passasse na família, se houvesse alguma razão para suspeitar que a sua filha
                    pudesse estar em perigo, deveria consultar a médium aqui. Que ela já a escutara
                    e seria capaz de ajudar—”
                </p>
                <p>
                    “Certo, <em>ela</em>,” dizes rispidamente. “A minha mãe era ‘A Grande
                    Francesca.’ Este era o negócio dela, e um dia morreu.”
                </p>
                <p>“Desculpe, não quis—”</p>
                <p>
                    Também estás zangado, embora não saibas bem porquê. “E eu tomei conta disto. É
                    para turistas e otários. <i>Apenas para fins de entretenimento.</i>”
                </p>
                <p>
                    “Eu sabia que isto ia ser uma perda de tempo,” diz Whitby. Ela lança uma{' '}
                    <C
                        options={[['luva de pele']]}
                        last="<b>luva tensa e furiosa</b>"
                        tag="p0_glove"
                    />{' '}
                    para a mesa. Tome, já fiz o que vinha cá fazer.”
                </p>
            </Section>
            <Section>
                <p>
                    <em>Há algo muito estranho nessa </em>{' '}
                    <C
                        options={[['luva.']]}
                        last="— <br/><br/><p>Pegas na luva, e tudo muda.</p>"
                        tag="p0_glove2"
                    />
                </p>
            </Section>
            <Section>
                <div
                    style={{
                        position: 'relative',
                        minHeight: '50vh',
                        width: '100%'
                    }}>
                    <Image
                        src="../stories/stone-harbor/images/study.jpg"
                        loader={({ src }) => src}
                        alt="Um escritório pequeno e atafulhado com quadros e uma cadeira de vime em
                        frente de uma mesa, em tons de sépia."
                        layout="fill"
                        objectFit="cover"
                        priority={true}
                    />
                </div>

                <h3>No escritório</h3>

                <p>
                    Olhas para baixo e não vês nada, é como se não estivesses lá. As cores do quarto
                    desbotaram todas. Os objetos estão desfocados e indistintos, como numa
                    fotografia antiga. Há uma estante de livros, uma mesa desarrumada com{' '}
                    <C
                        options={[
                            ['bibelôs'],
                            [
                                'uma mensagem inacabada',
                                'uma fotografia',
                                'uma receita médica em branco'
                            ]
                        ]}
                        last="objetos pessoais"
                        tag="p0_library_things"
                        widget={InlineListPT}
                    />
                    , um pequeno candeeiro e fotografias de família na parede. Há uma porta que leva
                    a um quarto bem iluminado, mas que é ainda mais turvo, menos real, do que este
                    quarto.
                </p>
            </Section>
            <Section>
                <p>
                    <R
                        tag="p0_library_things"
                        options={{
                            mensagem: `Olhas para a mensagem inacabada. Diz: <blockquote>Minha querida, espero que entendas
    que estou a fazer isto por necessidade e não por falta de amor a</blockquote> Não percebes
      como, mas reconheces a letra como sendo a de Alan Healey.`,
                            fotografia: `Examinas a imagem. É uma fotografia formal de grupo, tirada na praia: um homem idoso, uma mulher idosa, um homem
      e uma mulher já adultos que devem ser irmãos, uma rapariga jovem. Vês logo que o velhote é Alan Healey.`,
                            receita: `Lês a receita. É para um medicamento de que nunca ouviste falar, porém
      a tua intuição inclina-se para a hipertensão.`
                        }}
                    />
                </p>
                <p>
                    Uma silhueta surge à porta, encobrindo a luz. Ouves um som aflitivo vindo do
                    outro quarto, alguém a sufocar e a engasgar-se.
                </p>
                <p>
                    A figura ouve indiferente a agonia. O pânico cresce em ti, porém, absurdamente,
                    não tens pés para correres até ao quarto, nem voz com que pedir ajuda. Depois
                    dum tempo dolorosamente longo, o sufocar desvanece. Tudo é silêncio. A figura
                    fecha a porta do quarto, e a divisão está agora iluminada apenas pelo ténue
                    candeeiro na secretária. Ilumina a mão enluvada na maçaneta, um simples objeto
                    que te deixa paralisado. A figura experimenta a porta, e satisfeita que o quarto
                    está trancado, solta a maçaneta. A{' '}
                    <C
                        options={[['luva zangada']]}
                        last="luva violentamente zangada"
                        tag="p0_glove3"
                    />{' '}
                    parecendo ferver sob a luz—
                </p>
            </Section>
            <Section>
                <h3>Na tua sala de leitura</h3>
                <p>
                    E num ápice estás de volta, com uma sensação quase grotesca de estares
                    sobrecarregado com o peso do teu próprio corpo. Olhas para a luva que, embora
                    densa e pesada nas tuas mãos, perdeu toda a sensação de profunda{' '}
                    <em>maldade</em> que emanava. É só uma luva.
                </p>
                <p>Esta foi, na verdade, a primeira experiência espírita da tua vida.</p>
                <p>
                    Não fazes ideia de como vais explicar tudo isto a uma inspetora tão pragmática e
                    racional, mas quando encontras o seu olhar podes ver claramente que{' '}
                    <em>algo</em> se passou. Ela parece assustada contigo e não é pouco.
                </p>
                <p>Empurras a luva de volta para ela. “Healey foi assassinado.”</p>
            </Section>
        </Chapter>
    )
}
