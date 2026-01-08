import React, { useState } from "react";
import "./App.css";

function App() {
  // Состояния для всех полей формы
  const [formData, setFormData] = useState({
    vcpu: "",
    ram: "",
    ssd: "",
    hdd: "",
    ethernetPorts: "",
    rackUnits: "",
    power: "",
    adminSupport: "yes",
    slaLevel: ""
  });
  const [price, setPrice] = useState(0.0);

  // Обработчик изменения полей ввода
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Обработчик расчета цены
  const handleCalculate = (e) => {
    e.preventDefault();
    
    // Здесь вы можете использовать все данные из formData для расчета
    // Пример:
    const vcpu = parseFloat(formData.vcpu) || 0;
    const ram = parseFloat(formData.ram) || 0;
    const ssd = parseFloat(formData.ssd) || 0;
    const hdd = parseFloat(formData.hdd) || 0;
    const ethernetPorts = parseFloat(formData.ethernetPorts) || 0;
    const rackUnits = parseFloat(formData.rackUnits) || 0;
    const power = parseFloat(formData.power) || 0;
    const adminSupport = formData.adminSupport === "yes";
    const slaLevel = formData.slaLevel;
    
    // Пример расчета
    let calculatedPrice = 0;
    calculatedPrice += vcpu * 6; // $6 за VCPU
    calculatedPrice += ram * 0.8; // $0.8 за GB RAM
    calculatedPrice += ssd * 0.04; // $0.04 за GB SSD
    calculatedPrice += hdd * 0.015; // $0.015 за GB HDD
    calculatedPrice += ethernetPorts * 20; // $15 за порт
    calculatedPrice += rackUnits * 42; // $42 за rack unit
    calculatedPrice += power * 175; // $175 за kW
    
    if (adminSupport) {
      calculatedPrice += 100; // +$100 за поддержку
    }
    
    // Множитель для SLA
    const slaMultipliers = {
      "none": 1.0,
      "99.9": 1.10,
      "99.99": 1.25
    };
    calculatedPrice *= (slaMultipliers[slaLevel] || 1.0);
    
    setPrice(calculatedPrice);
  };

  return (
    <div className="app-container">
      <h1>VM Price Calculator</h1>
      <h2>Calculate your server costs easily</h2>
      
      <form onSubmit={handleCalculate}>
        <div className="sections-container">
          <div className="section compute-resources">
            <h3>Compute Resources</h3>
            <div className="input-group">
              <label>VCPU:</label>
              <input 
                type="number" 
                name="vcpu"
                value={formData.vcpu}
                onChange={handleInputChange}
                placeholder="0" 
                min="0" 
              />
            </div>
            <div className="input-group">
              <label>RAM (GB):</label>
              <input 
                type="number" 
                name="ram"
                value={formData.ram}
                onChange={handleInputChange}
                placeholder="0" 
                min="0" 
              />
            </div>
            <div className="input-group">
              <label>SSD (GB):</label>
              <input 
                type="number" 
                name="ssd"
                value={formData.ssd}
                onChange={handleInputChange}
                placeholder="0" 
                min="0" 
              />
            </div>
            <div className="input-group">
              <label>HDD (GB):</label>
              <input 
                type="number" 
                name="hdd"
                value={formData.hdd}
                onChange={handleInputChange}
                placeholder="0" 
                min="0" 
              />
            </div>
          </div>

          <div className="section network-power">
            <h3>Network & Power</h3>
            <div className="input-group">
              <label>Ethernet Ports:</label>
              <input 
                type="number" 
                name="ethernetPorts"
                value={formData.ethernetPorts}
                onChange={handleInputChange}
                placeholder="0" 
                min="0" 
              />
            </div>
            <div className="input-group">
              <label>Rack Units:</label>
              <input 
                type="number" 
                name="rackUnits"
                value={formData.rackUnits}
                onChange={handleInputChange}
                placeholder="0" 
                min="0" 
              />
            </div>
            <div className="input-group">
              <label>Power (kW):</label>
              <input 
                type="number" 
                name="power"
                value={formData.power}
                onChange={handleInputChange}
                placeholder="0" 
                min="0" 
                step="0.1" 
              />
            </div>
          </div>

          <div className="section additional-options">
            <h3>Additional Options</h3>
            <div className="input-group">
              <label>Admin Support:</label>
              <div className="toggle-group">
                <button
                  type="button"
                  className={`toggle-btn ${formData.adminSupport === "yes" ? "active" : ""}`}
                  onClick={() => setFormData(prev => ({ ...prev, adminSupport: "yes" }))}
                >
                  Yes
                </button>
                <button
                  type="button"
                  className={`toggle-btn ${formData.adminSupport === "no" ? "active" : ""}`}
                  onClick={() => setFormData(prev => ({ ...prev, adminSupport: "no" }))}
                >
                  No
                </button>
              </div>
            </div>
            <div className="input-group">
              <label>SLA Level:</label>
              <select 
                name="slaLevel"
                value={formData.slaLevel}
                onChange={handleInputChange}
              >
                <option value="">Select SLA</option>
                <option value="none">None</option>
                <option value="99.9">99.9</option>
                <option value="99.99">99.99</option>
              </select>
            </div>
          </div>
        </div>

        <div className="button-container">
          <button type="submit" className="calculate-btn">Calculate</button>
        </div>

        <div className="price-display">
          VM price per month: ${price.toFixed(2)}
        </div>
      </form>
    </div>
  );
}

export default App;
