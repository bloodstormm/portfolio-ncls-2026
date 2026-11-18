"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Eye, EyeOff } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { DotGrid, Rings } from "@/app/components/home/Decor";
import { useTheme } from "@/app/hooks/useTheme";
import { toast } from "sonner";

export function AdminLoginForm() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  useTheme(); // apply the saved light/dark theme outside the locale layout

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
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background px-6">
      <Rings className="absolute -right-40 -top-40 hidden h-[30rem] w-[30rem] text-primary/30 [mask-image:radial-gradient(closest-side,black_35%,transparent_98%)] md:block" />
      <DotGrid className="absolute -left-10 bottom-0 hidden h-64 w-64 text-primary/50 md:block" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-sm"
      >
        <span className="font-Odasans text-4xl font-bold text-logo">NCLS</span>

        <div className="mt-10 border-b border-border pb-8">
          <p className="text-sm font-medium text-primary md:text-base">Painel</p>
          <h1 className="mt-3 font-Wulkan text-[clamp(2.75rem,8vw,4rem)] leading-none tracking-[-0.02em]">
            Entrar
          </h1>
        </div>

        <form onSubmit={handleLogin} className="mt-8 space-y-5">
          <label htmlFor="password" className="block space-y-2">
            <span className="block text-sm font-medium">Senha</span>
            <span className="relative block">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                autoComplete="current-password"
                autoFocus
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                aria-invalid={Boolean(error)}
                className="h-12 w-full rounded-xl border border-input bg-background/40 px-4 pr-12 text-sm text-foreground placeholder:text-muted-foreground/60 transition-colors duration-300 focus:border-primary focus:outline-none focus:ring-[3px] focus:ring-ring/25 aria-[invalid=true]:border-destructive"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Esconder senha" : "Mostrar senha"}
                className="absolute right-1.5 top-1/2 grid size-9 -translate-y-1/2 place-items-center rounded-full text-muted-foreground transition-colors duration-300 hover:text-primary"
              >
                {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </span>
          </label>

          {error && (
            <motion.p
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              role="alert"
              className="text-sm text-destructive"
            >
              {error}
            </motion.p>
          )}

          <Button type="submit" size="pill" disabled={loading || !password} className="w-full">
            {loading ? (
              <>
                <span className="size-4 animate-spin rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground" />
                Verificando...
              </>
            ) : (
              <>
                Entrar no painel
                <ArrowRight />
              </>
            )}
          </Button>
        </form>

        <Link
          href="/"
          className="mt-10 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors duration-300 hover:text-primary"
        >
          <ArrowLeft className="size-4" />
          Voltar ao site
        </Link>
      </motion.div>
    </main>
  );
}
