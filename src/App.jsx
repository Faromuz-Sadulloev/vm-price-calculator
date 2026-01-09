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

  const [pricing, setPricing] = useState({
    vcpu: 6,
    ram: 0.8,
    ssd: 0.04,
    hdd: 0.015,
    ethernetPorts: 20,
    rackUnits: 42,
    power: 175,
    adminSupport: 100,
    slaMultipliers: {
      none: 1.0,
      "99.9": 1.10,
      "99.9.99": 1.25,
    }
  })

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
    calculatedPrice += vcpu * pricing.vcpu;
    calculatedPrice += ram * pricing.ram;
    calculatedPrice += ssd * pricing.ssd;
    calculatedPrice += hdd * pricing.hdd;
    calculatedPrice += ethernetPorts * pricing.ethernetPorts;
    calculatedPrice += rackUnits * pricing.rackUnits;
    calculatedPrice += power * pricing.power;
    
    if (adminSupport) {
      calculatedPrice += pricing.adminSupport;
    }
    
    // Множитель для SLA
    const slaMultipliers = {
      "none": 1.0,
      "99.9": 1.10,
      "99.99": 1.25
    };
    calculatedPrice *= pricing.slaMultipliers[slaLevel] || 1.0;
    
    setPrice(calculatedPrice);
  };

  return (
    <div className="app-container">
      <h1>VM Price Calculator</h1>
      <h2>Calculate your server costs easily</h2>
      
      <form onSubmit={handleCalculate}>
        <div className="sections-container">
          <div className="section price-section">
            <h3>Pricing Section</h3>
            <div className="pricing-grid">
              <div className="input-group">
                <label>VCPU Price:</label>
                <input 
                  type="number" 
                  name="vcpu-price" 
                  value={pricing.vcpu} onChange={(e) => setPricing(prev => ({...prev, vcpu: +e.target.value}))} 
                  />
              </div>
              <div className="input-group">
                <label>RAM Price:</label>
                <input 
                  type="number" 
                  name="ram-price" 
                  value={pricing.ram} onChange={(e) => setPricing(prev => ({...prev, ram: +e.target.value}))} 
                  />
              </div>
              <div className="input-group">
                <label>SSD Price:</label>
                <input 
                  type="number" 
                  name="ssd-price" 
                  value={pricing.ssd} onChange={(e) => setPricing(prev => ({...prev, ssd: +e.target.value}))} 
                  />
              </div>
              <div className="input-group">
                <label>HDD Price:</label>
                <input 
                  type="number" 
                  name="hdd-price" 
                  value={pricing.hdd} onChange={(e) => setPricing(prev => ({...prev, hdd: +e.target.value}))} 
                  />
              </div>
              <div className="input-group">
                <label>Eth-Ports Price:</label>
                <input 
                  type="number" 
                  name="ethernet-port-price" 
                  value={pricing.ethernetPorts} onChange={(e) => setPricing(prev => ({...prev, ethernetPorts: +e.target.value}))} 
                  />
              </div>
              <div className="input-group">
                <label>R-Units Price:</label>
                <input 
                  type="number" 
                  name="rack-units-price" 
                  value={pricing.rackUnits} onChange={(e) => setPricing(prev => ({...prev, rackUnits: +e.target.value}))} 
                  />
              </div>
              <div className="input-group">
                <label>Power (Kw) Price:</label>
                <input 
                  type="number" 
                  name="power-price" 
                  value={pricing.power} onChange={(e) => setPricing(prev => ({...prev, power: +e.target.value}))} 
                  />
              </div>
            </div>
          </div>
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

          <div className="section-row">
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
            
            <div className="calculate-price-container">
              <div className="button-container">
                <button type="submit" className="calculate-btn">Calculate</button>
              </div>
              <div className="price-display">
                VM price per month: ${price.toFixed(2)}
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default App;
