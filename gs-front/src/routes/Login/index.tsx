

export default function Login() {
  return (
    <div className="flex items-center justify-center h-screen bg-slate-900">
      <div className="bg-slate-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6 text-teal">
          Entrar
        </h2>
        <form className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-subtext-0"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-sm text-white focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent"
              placeholder="Email"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-subtext-0"
            >
              Senha
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 block w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-sm text-white focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent"
              placeholder="Senha"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-teal hover:bg-teal/90 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-300"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
