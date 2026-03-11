"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { toast } from "sonner";
import { fadeInUp } from "@/app/utils/Animations";

export function AdminLoginForm() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        sessionStorage.setItem("admin_authenticated", "true");
        sessionStorage.setItem("admin_token", password);
        toast.success("🎉 Login realizado com sucesso!");
        router.push("/admin/projects");
      } else {
        const data = await res.json();
        setError(data.error || "Senha incorreta. Tente novamente.");
        toast.error("❌ Senha incorreta. Tente novamente.");
      }
    } catch (err) {
      setError("Erro ao fazer login. Tente novamente.");
      toast.error("❌ Erro ao fazer login. Tente novamente.");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-background flex items-center justify-center my-24 px-4">
      <motion.div {...fadeInUp} className="w-full max-w-md">
        <div className="bg-gradient-to-br from-background/90 to-background/60 backdrop-blur-sm border border-beige/20 rounded-2xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <h1 className="font-Wulkan text-3xl uppercase text-primary mb-2">Admin Portal</h1>
            <div className="w-16 h-1 bg-primary mx-auto rounded-full mb-4" />
            <p className="text-muted">Acesso restrito para administração do portfólio</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-primary mb-2">
                Senha de Acesso
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-background/50 border border-beige/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-colors duration-300"
                  placeholder="Digite a senha de administrador"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-primary transition-colors duration-300"
                >
                  {showPassword ? <BsEyeSlash className="h-5 w-5" /> : <BsEye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-sm"
              >
                {error}
              </motion.div>
            )}

            <button
              type="submit"
              disabled={loading || !password}
              className="w-full px-6 py-3 bg-primary text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/80 transition-colors duration-300 transform hover:scale-105"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Verificando...</span>
                </div>
              ) : (
                "Acessar Painel"
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-muted">Este é um acesso restrito ao painel administrativo</p>
            <button
              onClick={() => router.push("/")}
              className="mt-2 text-sm text-primary hover:underline"
            >
              ← Voltar ao portfólio
            </button>
          </div>
        </div>
      </motion.div>
    </main>
  );
}
