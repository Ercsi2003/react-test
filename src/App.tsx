import React, {useState, useEffect} from "react";
import './todolist.css'


interface Item {
  id: number;
  name: string;
  amount: number;
  unit: string;
  completed: boolean;
}

function App() {
  const [items, setItems] = useState<Item[]>([]);
  const [newItemName, setNewItemName] = useState('');
  const [newItemAmount, setNewItemAmount] = useState(Number);
  const [newItemUnit, setNewItemUnit] = useState('');
  const [error, setError] = useState('');
  const [allPurchased, setAllPurchased] = useState(false);

  const addItem = () => {
    if (newItemName.trim() === '' || newItemAmount <= 0 || newItemUnit.trim() === '') {
      setError("All fields must be filled!");
      return;
    }

    if (items.some(item => item.name === newItemName)) {
      setError("This product is already in the list!");
      return;
    }

    if (newItemName.length > 15) {
      setError("The product name can't be longer than 15 characters!");
      return;
    }

    const newItem: Item = { id: Date.now(), name: newItemName, amount: newItemAmount, unit: newItemUnit, completed: false };

    setItems((prevItems) => [...prevItems, newItem]);
    setNewItemName('');
    setNewItemAmount(Number);
    setNewItemUnit('');
    setError('');
  };

  const toggleItemCompletion = (id: number) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const deleteItem = (id: number) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  useEffect(() => {
    setAllPurchased(items.length > 0 && items.every(item => item.completed));
  }, [items]);

  const remainingItems = items.filter(item => !item.completed).length;

  return (
  <>
    <div>
      <h2>Products list</h2>
      <div>
        <label htmlFor="">Product's name: </label>
        <input type="text" value={newItemName} onChange={(e) =>{ setNewItemName(e.target.value)}} name="" id="" />
        <label htmlFor="">Quantity: </label>
        <input type="text" value={newItemAmount} onChange={(e) =>{ setNewItemAmount(parseInt(e.target.value))}} name="" id="" />
        <label htmlFor="">Quantity unit: </label>
        <input type="text" value={newItemUnit} onChange={(e) =>{ setNewItemUnit(e.target.value)}} name="" id="" />
        <p></p>
        <button id="addButton" onClick={addItem}>Add product</button>
      </div>
      <div>
      {allPurchased && <div className="success">All products has been purchased!</div>}
      </div>
      <p style={{ color: "red" }}>{error}</p>
      <ul>
          {items.map((item) => {
            const itemClass = `item ${item.completed ? "bought" : ""}`;
            return(
            <li key={item.id} className={itemClass}>
              <span style={{opacity: item.completed? "0.2": "1"}}>
              {item.name + " "+ item.amount + " " + item.unit}
              
              </span>
              <button onClick={() => toggleItemCompletion(item.id)}>
                {item.completed ? "Restore": "Buy"}
              </button>
              <button onClick={() => deleteItem(item.id)}>Delete</button>
            </li>
            );
          })}
      </ul>
      <div>
        <p id="remainingParagraph">{remainingItems} products left on the list</p>
      </div>
    </div>
    
  </>
  )
 
}

export default App;
