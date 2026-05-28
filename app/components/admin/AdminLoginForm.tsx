"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { BsEye, BsEyeSlash, BsArrowLeft } from "react-icons/bs";
import { toast } from "sonner";

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
        toast.success("Login realizado com sucesso!");
        router.push("/admin/projects");
      } else {
        const data = await res.json();
        setError(data.error || "Senha incorreta. Tente novamente.");
      }
    } catch (err) {
      setError("Erro ao fazer login. Tente novamente.");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-sm"
      >
        {/* Header */}
        <div className="mb-12 space-y-3">
          <span className="text-primary text-xs uppercase tracking-widest font-Odasans">
            Admin
          </span>
          <h1 className="font-Wulkan text-5xl uppercase leading-none">
            Portal
          </h1>
          <div className="w-full h-px bg-foreground/10 mt-6" />
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-widest text-foreground/40 font-Odasans">
              Senha de acesso
            </span>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3.5 bg-transparent border border-foreground/10 rounded-xl text-sm text-foreground placeholder:text-foreground/20 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all duration-300"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-foreground/30 hover:text-primary transition-colors duration-300"
              >
                {showPassword ? <BsEyeSlash className="h-4 w-4" /> : <BsEye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-400 text-xs"
            >
              {error}
            </motion.p>
          )}

          <button
            type="submit"
            disabled={loading || !password}
            className="w-full px-6 py-3.5 bg-primary text-white rounded-full text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-primary/90 transition-colors duration-300"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Verificando...
              </span>
            ) : (
              "Acessar painel"
            )}
          </button>
        </form>

        {/* Back link */}
        <button
          onClick={() => router.push("/")}
          className="mt-10 inline-flex items-center gap-2 text-xs uppercase tracking-widest text-foreground/30 hover:text-primary transition-colors duration-300"
        >
          <BsArrowLeft className="h-3.5 w-3.5" />
          Voltar ao portfólio
        </button>
      </motion.div>
    </main>
  );
}
