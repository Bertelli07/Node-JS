"use client";

import { useState } from "react"
import { Plus, Minus, Trash } from "lucide-react"
import clsx from "clsx"

type Produto = {
  id: number
  nome: string
  quantidade: number
}

export default function Page() {
  const [produtos, setProdutos] = useState<Produto[]>([])
  const [nome, setNome] = useState("")

  function adicionarProduto() {
    if (!nome) return

    setProdutos([
      ...produtos,
      {
        id: Date.now(),
        nome,
        quantidade: 0,
      },
    ])

    setNome("")
  }

  function removerProduto(id: number) {
    setProdutos(produtos.filter((p) => p.id !== id))
  }

  function aumentar(id: number) {
    setProdutos(
      produtos.map((p) =>
        p.id === id ? { ...p, quantidade: p.quantidade + 1 } : p
      )
    )
  }

  function diminuir(id: number) {
    setProdutos(
      produtos.map((p) =>
        p.id === id ? { ...p, quantidade: p.quantidade - 1 } : p
      )
    )
  }

  return (
    <div className="p-6 max-w-xl">
      <h1 className="text-xl mb-4">Estoque</h1>

      <div className="flex gap-2 mb-6">
        <input
          className="border px-2 py-1"
          placeholder="nome do produto"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />

        <button
          onClick={adicionarProduto}
          className="border px-3 py-1 flex items-center gap-1"
        >
          <Plus size={16} />
          adicionar
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {produtos.map((p) => (
          <div
            key={p.id}
            className="border p-3 flex items-center justify-between"
          >
            <div>
              <p>{p.nome}</p>
              <p className="text-sm text-gray-500">
                quantidade: {p.quantidade}
              </p>
            </div>

            <div className="flex items-center gap-2">
              {/* botão diminuir some se quantidade for 0 */}
              {p.quantidade > 0 && (
                <button
                  onClick={() => diminuir(p.id)}
                  className="border p-1"
                >
                  <Minus size={16} />
                </button>
              )}

              <button
                onClick={() => aumentar(p.id)}
                className="border p-1"
              >
                <Plus size={16} />
              </button>

              <button
                onClick={() => removerProduto(p.id)}
                className={clsx("border p-1 text-red-500")}
              >
                <Trash size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}