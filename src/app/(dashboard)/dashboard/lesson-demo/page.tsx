import { RichText, DocumentAlert } from "@/components/ui/rich-text";

export default function LessonDemoPage() {
      return (
            <div className="p-8 max-w-4xl mx-auto">
                  <div className="mb-8">
                        <span className="bg-indigo-100 text-indigo-800 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider mb-3 inline-block">
                              Nível A1 • Iniciante
                        </span>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Le Verbe "Être" et Se Présenter</h1>
                        <p className="text-gray-500 mt-2">Plano de Aula A1 - Renderizado com Rich Document Style</p>
                  </div>

                  <div className="bg-white dark:bg-slate-900/50 p-8 md:p-12 rounded-3xl shadow-xl border border-gray-100 dark:border-white/10">
                        <RichText>
                              <h2>📖 Parte 1: Teoria (Leçon)</h2>
                              <h3>O Verbo "Être" (Ser/Estar) e as Nacionalidades</h3>

                              <p>
                                    Bem-vindo(a) à sua primeira aula! Em francês, o verbo <strong>être</strong> é a base de tudo. Usamo-lo para dizer quem somos, a nossa nacionalidade, a nossa profissão e como nos sentimos.
                              </p>

                              <h4>1. A Conjugação do Verbo Être (Presente)</h4>

                              <DocumentAlert variant="tip" title="Dica de pronúncia">
                                    O "s" final e o "t" final geralmente não se pronunciam em francês!
                              </DocumentAlert>

                              <table>
                                    <thead>
                                          <tr>
                                                <th>Pronome Pessoal</th>
                                                <th>Verbo Être</th>
                                                <th>Tradução</th>
                                          </tr>
                                    </thead>
                                    <tbody>
                                          <tr>
                                                <td><strong>Je</strong></td>
                                                <td>suis</td>
                                                <td>Eu sou / estou</td>
                                          </tr>
                                          <tr>
                                                <td><strong>Tu</strong></td>
                                                <td>es</td>
                                                <td>Tu és / estás</td>
                                          </tr>
                                          <tr>
                                                <td><strong>Il / Elle / On</strong></td>
                                                <td>est</td>
                                                <td>Ele / Ela / A gente é/está</td>
                                          </tr>
                                          <tr>
                                                <td><strong>Nous</strong></td>
                                                <td>sommes</td>
                                                <td>Nós somos / estamos</td>
                                          </tr>
                                          <tr>
                                                <td><strong>Vous</strong></td>
                                                <td>êtes</td>
                                                <td>Vós sois / Vocês são (ou Senhor/Senhora)</td>
                                          </tr>
                                          <tr>
                                                <td><strong>Ils / Elles</strong></td>
                                                <td>sont</td>
                                                <td>Eles / Elas são/estão</td>
                                          </tr>
                                    </tbody>
                              </table>

                              <DocumentAlert variant="note" title="Material de Apoio">
                                    <em>(Nota: Adicione aqui um vídeo do YouTube do professor pronunciando estas palavras).</em>
                              </DocumentAlert>

                              <h4>2. As Nacionalidades (Les Nationalités)</h4>
                              <p>
                                    Em francês, os adjetivos de nacionalidade mudam dependendo se quem fala é homem (masculino) ou mulher (feminino). A regra geral é adicionar um <strong>-e</strong> no feminino.
                              </p>

                              <ul>
                                    <li><strong>Masculino:</strong> Je suis brésilien. <em>(Eu sou brasileiro)</em></li>
                                    <li><strong>Feminino:</strong> Je suis brésilienne. <em>(Eu sou brasileira)</em></li>
                              </ul>
                              <ul>
                                    <li><strong>Masculino:</strong> Il est français. <em>(Ele é francês)</em></li>
                                    <li><strong>Feminino:</strong> Elle est française. <em>(Ela é francesa)</em></li>
                              </ul>

                              <hr />

                              <h2>✍️ Parte 2: Prática Automática</h2>
                              <p>No futuro, o frontend pode transformar este bloco em inputs interativos. Por agora, o aluno lê e responde mentalmente ou num caderno.</p>

                              <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-xl border border-slate-200 dark:border-slate-700 not-prose mb-8">
                                    <h4 className="font-bold text-lg mb-4 text-slate-800 dark:text-slate-200">Exercício 1: Complete com a forma correta do verbo "Être" (suis, es, est, sommes, êtes, sont):</h4>
                                    <ol className="list-decimal pl-5 space-y-3 text-slate-700 dark:text-slate-300">
                                          <li>Je <strong>________</strong> étudiant.</li>
                                          <li>Tu <strong>________</strong> fatigué ?</li>
                                          <li>Marie (Elle) <strong>________</strong> brésilienne.</li>
                                          <li>Nous <strong>________</strong> à Paris !</li>
                                          <li>Marc et Paul (Ils) <strong>________</strong> français.</li>
                                    </ol>

                                    <h4 className="font-bold text-lg mt-8 mb-4 text-slate-800 dark:text-slate-200">Exercício 2: Transforme para o feminino:</h4>
                                    <ul className="space-y-3 text-slate-700 dark:text-slate-300">
                                          <li>Il est américain. &rarr; Elle est <strong>_______________</strong>.</li>
                                          <li>Il est mexicain. &rarr; Elle est <strong>_______________</strong>.</li>
                                    </ul>
                              </div>

                              <hr />

                              <h2>🎤 Parte 3: A Missão Prática (Assignment)</h2>
                              <p>
                                    <em>(Esta parte corresponde à entidade Activity no banco de dados, que o aluno terá de enviar para correção)</em>
                              </p>

                              <DocumentAlert variant="important" title="Título da Tarefa: Ma Première Présentation (A minha primeira apresentação)">
                                    <p className="font-semibold mb-2">Instruções:</p>
                                    <p>Agora é a sua vez de falar! Use o que aprendeu hoje para criar a sua apresentação. Grave um áudio (usando o Vocaroo.com ou gravador de telemóvel) ou escreva no campo abaixo as seguintes informações:</p>
                                    <ul className="list-disc pl-5 my-2 space-y-1">
                                          <li>Diga "Bom dia" ou "Boa noite" (Bonjour / Bonsoir).</li>
                                          <li>Diga quem você é (Ex: Je suis Lucas).</li>
                                          <li>Diga a sua nacionalidade (Ex: Je suis brésilien/brésilienne).</li>
                                          <li>Diga o seu estado atual (Ex: Je suis content / fatigué / prêt).</li>
                                    </ul>
                                    <p className="mt-4 font-semibold text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-900/20 p-3 rounded-lg border border-indigo-100 dark:border-indigo-800/30">
                                          Exemplo esperado: "Bonjour, je suis Maria. Je suis brésilienne et je suis contente!"
                                    </p>
                              </DocumentAlert>

                              <p className="text-xl text-center font-bold text-emerald-600 dark:text-emerald-400 mt-8">
                                    Bon courage ! (Bom trabalho!)
                              </p>

                        </RichText>
                  </div>
            </div>
      );
}
