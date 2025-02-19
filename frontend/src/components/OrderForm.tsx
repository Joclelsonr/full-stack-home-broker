import { Asset, OrderType } from "@/model";
import { Button, Label, TextInput } from "flowbite-react";

export type OrderFormProps = {
  asset: Asset;
  walletId: string;
  type: OrderType;
};

export function OrderForm({ asset, walletId, type }: OrderFormProps) {
  const color = type == OrderType.BUY ? "text-blue-700" : "text-red-500";
  const translatedType = type == OrderType.BUY ? "compra" : "venda";

  return (
    <form>
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
