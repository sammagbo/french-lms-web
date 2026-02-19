import axios from 'axios';

const api = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api/v1',
      headers: {
            'Content-Type': 'application/json',
      },
});

// Request Interceptor: Add Token
api.interceptors.request.use(
      (config) => {
            if (typeof window !== 'undefined') {
                  const token = localStorage.getItem('token');
                  if (token) {
                        config.headers.Authorization = `Bearer ${token}`;
                  }
            }
            return config;
      },
      (error) => {
            return Promise.reject(error);
      }
);

// Response Interceptor: Handle 401
api.interceptors.response.use(
      (response) => response,
      (error) => {
            if (error.response && error.response.status === 401) {
                  if (typeof window !== 'undefined') {
                        localStorage.removeItem('token');
                        if (!window.location.pathname.includes('/login')) {
                              window.location.href = '/login';
                        }
                  }
            }
            return Promise.reject(error);
      }
);

// ============================================================
// DEMO MODE — Controlled by NEXT_PUBLIC_DEMO_MODE env var
// Set NEXT_PUBLIC_DEMO_MODE=true to enable offline mock data
// ============================================================
const DEMO_MODE = process.env.NEXT_PUBLIC_DEMO_MODE === 'true';

if (DEMO_MODE) {
      const MOCK_USER = { id: '1', email: 'prof@escola.com', name: 'Professor', role: 'TEACHER' };
      const MOCK_COURSES = [
            { id: '1', title: 'Francês para Iniciantes', description: 'Aprenda os fundamentos do idioma francês com aulas práticas e exercícios diários.', price: 29.90 },
            { id: '2', title: 'Francês Intermediário', description: 'Aprofunde seus conhecimentos e domine a gramática francesa avançada.', price: 49.90 },
            { id: '3', title: 'Conversação em Francês', description: 'Pratique conversação com cenários do dia-a-dia e expressões idiomáticas.', price: 39.90 },
            { id: '4', title: 'Francês para Negócios', description: 'Vocabulário e expressões essenciais para o mundo corporativo francófono.', price: 59.90 },
      ];
      const MOCK_COURSE_DETAIL = {
            id: '1', title: 'Francês para Iniciantes', description: 'Aprenda os fundamentos do idioma francês.', price: 29.90,
            modules: [{
                  id: 'm1', title: 'Módulo 1 — Saudações', order: 1,
                  lessons: [
                        { id: '1', title: 'Aula 01 — Les Salutations', order: 1, videoUrl: '', content: '<h2>Bonjour!</h2><p>Nesta aula você vai aprender a cumprimentar as pessoas em francês.</p><ul><li><strong>Bonjour</strong> — Bom dia / Olá</li><li><strong>Bonsoir</strong> — Boa noite</li><li><strong>Salut</strong> — Oi (informal)</li><li><strong>Au revoir</strong> — Tchau</li></ul><p>Pratique essas expressões no seu dia-a-dia!</p>' },
                        { id: '2', title: 'Aula 02 — Se Présenter', order: 2, videoUrl: '', content: '<h2>Je m\'appelle...</h2><p>Aprenda a se apresentar em francês de forma natural.</p>' },
                  ],
            }, {
                  id: 'm2', title: 'Módulo 2 — La Vie Quotidienne', order: 2,
                  lessons: [
                        { id: '3', title: 'Aula 03 — Les Nombres', order: 1, videoUrl: '', content: '<h2>Un, Deux, Trois...</h2><p>Domine os números em francês.</p>' },
                  ],
            }],
      };

      api.interceptors.response.use(
            (response) => response,
            (error) => {
                  if (error.code === 'ERR_NETWORK' || error.code === 'ERR_CONNECTION_REFUSED' || !error.response) {
                        const url = error.config?.url || '';
                        console.warn(`[DEMO] Backend offline, serving mock: ${url}`);

                        if (url.includes('/auth/login')) {
                              return Promise.resolve({ data: { access_token: 'demo-token' }, status: 201 });
                        }
                        if (url.includes('/users/me') || url.includes('/auth/profile')) {
                              return Promise.resolve({ data: MOCK_USER, status: 200 });
                        }
                        if (/\/academy\/courses\/[^/]+$/.test(url)) {
                              return Promise.resolve({ data: MOCK_COURSE_DETAIL, status: 200 });
                        }
                        if (url.includes('/academy/courses')) {
                              return Promise.resolve({ data: MOCK_COURSES, status: 200 });
                        }
                        if (url.includes('/classroom')) {
                              return Promise.resolve({ data: [], status: 200 });
                        }
                        return Promise.resolve({ data: {}, status: 200 });
                  }
                  return Promise.reject(error);
            }
      );
}

export default api;

