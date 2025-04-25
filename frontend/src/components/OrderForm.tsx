"use client";

import { FormEvent } from "react";
import { Asset, Order, OrderType } from "@/model";
import { Button, Label, TextInput } from "flowbite-react";
import { socket } from "@/socket.io";
import { toast } from "react-toastify";

export type OrderFormProps = {
  asset: Asset;
  walletId: string;
  type: OrderType;
};

export function OrderForm({ asset, walletId, type }: OrderFormProps) {
  const color = type == OrderType.BUY ? "text-blue-700" : "text-red-500";
  const translatedType = type == OrderType.BUY ? "compra" : "venda";

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData);

    socket.connect();
    const newOrder: Order = await socket.emitWithAck("orders/create", data);
    toast(
      `Ordem de ${translatedType} de ${newOrder.shares} ações de ${asset.symbol} criada com sucesso!`,
      {
        type: "success",
        position: "top-right",
      }
    );
  }

  return (
    <form onSubmit={onSubmit}>
      <input type="hidden" name="assetId" defaultValue={asset._id} />
      <input type="hidden" name="walletId" defaultValue={walletId} />
      <input type="hidden" name="type" defaultValue={type} />
      <div>
        <div className="mb-2">
          <Label htmlFor="shares" value="Quantidade" className={color} />
        </div>
        <TextInput
          id="shares"
          name="shares"
          required
          type="number"
          min={1}
          step={1}
          defaultValue={1}
          color={type == OrderType.BUY ? "info" : "failure"}
        />
      </div>
      <br />
      <div>
        <div className="mb-2">
          <Label htmlFor="price" value="Preço R$" className={color} />
        </div>
        <TextInput
          id="price"
          name="price"
          required
          type="number"
          min={1}
          step={1}
          defaultValue={1}
          color={type == OrderType.BUY ? "info" : "failure"}
        />
      </div>
      <br />
      <Button type="submit" color={type == OrderType.BUY ? "blue" : "failure"}>
        Confirmar {translatedType}
      </Button>
    </form>
  );
}
