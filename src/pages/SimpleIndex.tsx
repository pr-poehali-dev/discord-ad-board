import { useState } from "react";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const SimpleIndex = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen bg-gray-50">
      <h1 className="text-2xl font-bold p-4">Discord Ads Board</h1>
      <div className="p-4">
        <p>Count: {count}</p>
        <Button onClick={() => setCount(count + 1)}>
          <Icon name="Plus" size={16} className="mr-2" />
          Test Button: {count}
        </Button>
      </div>
    </div>
  );
};

export default SimpleIndex;
