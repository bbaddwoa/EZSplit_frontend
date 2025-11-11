import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router";
import useQuery from "../api/useQuery";

const SelectItems = () => {
  const { tableNumber } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const guestCount = location.state?.guestCount || 2;
  const guestIndex = location.state?.guestIndex || 0;
  const {
    data: menu,
    loading,
    error,
  } = useQuery(`/menuTables/${tableNumber}`, "menu");
  const [items, setItems] = useState([]);
  useEffect(() => {
    if (menu?.length > 0) {
      const formattedItems = menu.map((m, index) => ({
        id: m.id || index + 1,
        name: m.items || m.name || "Unnamed Item",
        price: parseFloat(m.prices || m.price || 0),
        selectedBy: null,
      }));
      setItems(formattedItems);
    }
  }, [menu]);
  const toggleItem = (id) => {
    setItems((prev) =>
      prev.map((items) => {
        if (items.id === id && items.selectedBy === guestIndex) {
          return { ...items, selectedBy: null };
        }
        if (items.id === id && items.selectedBy === null) {
          return { ...items, selectedBy: guestIndex };
        }
        return items;
      })
    );
  };
  const handleContinue = () => {
    const selectedItems = items.filter((i) => i.selectedBy === guestIndex);
    if (selectedItems.length === 0) {
      alert("Please select at least one item before continuing.");
      return;
    }
    const totalAmount = selectedItems.reduce(
      (sum, item) => sum + item.price,
      0
    );
    navigate(`/table/${tableNumber}/PayForCustomSplit`, {
      state: {
        tableNumber,
        guestIndex,
        guestCount,
        selectedItems,
        totalAmount,
      },
    });
  };
  if (loading) return <p>Loading menu...</p>;
  if (error) return <p>Sorry, there was an error loading the menu: {error}</p>;
  if (!items.length) return <p>No menu items found.</p>;
  return (
    <div className="select-items-page">
      <div className="selectItems-container">
        <header className="selectItems-header">
          <div className="logo-container">
            <img
              src="/ezsplit-logo.jpg"
              alt="EZSplit Logo"
              className="logo"
              onError={(e) => (e.target.style.display = "none")}
            />
          </div>
          <h1 className="selectItems-title">Select Your Items</h1>
          <p className="table-info">
            Table #{tableNumber} — Guest {guestIndex + 1} of {guestCount}
          </p>
        </header>
        <main className="selectItems-main">
          <div className="selectItems-list">
            {items.map((item) => (
              <div
                key={item.id}
                className={`selectItems-item ${
                  item.selectedBy === guestIndex
                    ? "selected"
                    : item.selectedBy !== null
                    ? "disabled"
                    : ""
                }`}
                onClick={() => {
                  if (
                    item.selectedBy === null ||
                    item.selectedBy === guestIndex
                  )
                    toggleItem(item.id);
                }}
              >
                <div className="item-details">
                  <span className="item-name">{item.name}</span>
                  <span className="item-price">${item.price.toFixed(2)}</span>
                </div>
                <input
                  type="checkbox"
                  checked={item.selectedBy === guestIndex}
                  onChange={() => toggleItem(item.id)}
                  disabled={
                    item.selectedBy !== null && item.selectedBy !== guestIndex
                  }
                  className="item-checkbox"
                />
              </div>
            ))}
          </div>
          <button className="submit-button" onClick={handleContinue}>
            Continue to Payment
          </button>
        </main>
      </div>
    </div>
  );
};
export default SelectItems;
