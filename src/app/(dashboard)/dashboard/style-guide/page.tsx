import { RichText, DocumentAlert } from "@/components/ui/rich-text";

export default function StyleGuidePage() {
      return (
            <div className="p-8 max-w-4xl mx-auto">
                  <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Biblioteca de Estilos (Rich Document)</h1>
                        <p className="text-gray-500 mt-2">Demonstração da réplica visual "Artifact" do assistente em uma página do LMS.</p>
                  </div>

                  <div className="bg-notebook p-8 md:p-12 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
                        <RichText>
                              <h1>Lição 1: Bem-vindo à nova Leitura Interativa</h1>
                              <p>Bem-vindo a este guia demonstrativo. Aqui nós mostramos como o novo <strong>Renderizador de Documentos Ricos</strong> reproduz a experiência elegante e focada de leitura dos nossos artefatos (Artifacts).</p>

                              <h2>Seção 1: Os Conceitos Básicos</h2>
                              <p>Nesta seção, nós mostramos como os textos se adaptam organicamente usando o plugin oficial de Tipografia do Tailwind. Você notará que o espaçamento, tamanho da fonte e cores são ajustados automaticamente.</p>
                              <ul>
                                    <li>Componentes responsivos e com excelente legibilidade</li>
                                    <li>Margens automáticas (<code>prose</code>) em títulos e parágrafos</li>
                                    <li>Contraste acessível em modo claro e escuro</li>
                              </ul>

                              <DocumentAlert variant="note" title="Nota Histórica">
                                    O idioma francês, assim como o português, é derivado do latim vulgar. Isso significa que você encontrará muitas palavras semelhantes (cognatos).
                              </DocumentAlert>

                              <h2>Seção 2: Sistema de Alertas (Callouts)</h2>
                              <p>Muitas vezes, precisamos destacar informações críticas. Em vez de blocos de cor genéricos, usamos nosso próprio componente de alerta que simula o uso do GitHub Flavored Markdown.</p>

                              <DocumentAlert variant="tip" title="Dica Rápida (Tip)">
                                    Você sabia? Você pode usar as crases para formar <code>`código embutido`</code> e realçar conceitos dentro dos nossos alertas!
                              </DocumentAlert>

                              <p>Quando um usuário está resolvendo exercícios, é ótimo lembrar sobre os falsos amigos (faux amis) na tradução.</p>

                              <DocumentAlert variant="warning" title="Gramática (Warning)">
                                    No francês, a maioria dos adjetivos vem <strong>após</strong> o substantivo (ex: "un chat noir"), ao contrário do inglês, mas semelhante ao português!
                              </DocumentAlert>

                              <h2>Seção 3: Código e Textos Livres</h2>
                              <p>Às vezes é necessário mostrar blocos de dados ou código aos nossos alunos, especialmente em formatos técnicos.</p>
                              <pre><code>{`// Um exemplo clássico de código no terminal francês
function direBonjour() {
    console.log("Bonjour le monde !");
}
direBonjour();`}</code></pre>

                              <h3>Últimos Avisos</h3>
                              <p>Ao chegar ao fim da página, é comum termos destaques maiores ou ações destrutivas.</p>

                              <DocumentAlert variant="important" title="Importante">
                                    Não se esqueça de validar a lista de falsos amigos na Aba Anexos antes de submeter o seu Teste de Nivelamento avançado.
                              </DocumentAlert>

                              <DocumentAlert variant="caution" title="Zerar Progresso (Caution)">
                                    Esta ação resetará todo o seu progresso na Lição 1. Proceda apenas se tiver absoluta certeza!
                              </DocumentAlert>

                        </RichText>
                  </div>
            </div>
      );
}
