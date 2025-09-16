import { useState } from "react";
import Select from "react-select";
import { Country, State, City } from "country-state-city";
import { toast, ToastContainer } from "react-toastify";

const ShippingForm = () => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    postalCode: "",
    address: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("billingData", JSON.stringify(formData));
    toast("✅ Address saved!", {
      position: "bottom-center",
      autoClose: 1499,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "dark",
      limit: 1,
      hideProgressBar: true,
      style: { width: "250px" },
    });
    // console.log({
    //     ...formData,
    //     country: selectedCountry?.name,
    //     state: selectedState?.name,
    //     city: selectedCity?.name,
    // });
  };

  const countryOptions = Country.getAllCountries().map((country) => ({
    label: country?.name,
    value: country?.isoCode,
  }));

  const stateOptions = selectedCountry
    ? State.getStatesOfCountry(selectedCountry.value).map((state) => ({
        label: state?.name,
        value: state?.isoCode,
      }))
    : [];

  const cityOptions = selectedState
    ? City.getCitiesOfState(selectedCountry.value, selectedState.value).map(
        (city) => ({
          label: city?.name,
          value: city?.name,
        })
      )
    : [];

  return (
    <form onSubmit={handleSubmit} className="text-sm">
      <div className="w-full flex flex-col md:flex-row md:gap-5">
        <div className="mb-4 w-full md:w-1/2 block md:inline-block">
          <label
            className="block text-gray-700 text-xs font-semibold mb-2"
            htmlFor="name"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 rounded-lg border border-zinc-300 outline-none"
          />
        </div>
        <div className="mb-4 w-full md:w-1/2 block md:inline-block">
          <label
            className="block text-gray-700 text-xs font-semibold mb-2"
            htmlFor="mobile"
          >
            Mobile Number
          </label>
          <input
            type="tel"
            id="mobile"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 rounded-lg border border-zinc-300 outline-none"
          />
        </div>
      </div>

      <div className="w-full flex flex-col md:flex-row md:gap-5">
        <div className="mb-4 w-full md:w-1/2">
          <label
            className="block text-gray-700 text-xs font-semibold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 rounded-lg border border-zinc-300 outline-none"
          />
        </div>
        <div className="mb-4 w-full md:w-1/2">
          <label
            className="block text-gray-700 text-xs font-semibold mb-2"
            htmlFor="country"
          >
            Country
          </label>
          <Select
            id="country"
            name="country"
            options={countryOptions}
            value={selectedCountry}
            required
            onChange={(option) => {
              setSelectedCountry(option);
              setSelectedState(null); // Reset state when country changes
              setSelectedCity(null); // Reset city when country changes
            }}
            placeholder="Select Country"
            className="w-full rounded-lg outline-none"
          />
        </div>
      </div>

      <div className="w-full flex flex-col md:flex-row md:gap-5">
        <div className="mb-4 w-full md:w-1/3">
          <label
            className="block text-gray-700 text-xs font-semibold mb-2"
            htmlFor="state"
          >
            State
          </label>
          <Select
            id="state"
            name="state"
            options={stateOptions}
            value={selectedState}
            required
            onChange={(option) => {
              setSelectedState(option);
              setSelectedCity(null); // Reset city when state changes
            }}
            placeholder="Select State"
            className="w-full rounded-lg outline-none"
            isDisabled={!selectedCountry}
          />
        </div>

        <div className="mb-4 w-full md:w-1/3">
          <label
            className="block text-gray-700 text-xs font-semibold mb-2"
            htmlFor="city"
          >
            City
          </label>
          <Select
            id="city"
            name="city"
            options={cityOptions}
            value={selectedCity}
            required
            onChange={setSelectedCity}
            placeholder="Select City"
            className="w-full rounded-lg outline-none"
            isDisabled={!selectedState}
          />
        </div>

        <div className="mb-4 w-full md:w-1/3">
          <label
            className="block text-gray-700 text-xs font-semibold mb-2"
            htmlFor="postalCode"
          >
            Postal Code
          </label>
          <input
            type="text"
            id="postalCode"
            name="postalCode"
            value={formData.postalCode}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 rounded-lg border border-zinc-300 outline-none"
          />
        </div>
      </div>

      <div className="mb-4">
        <label
          className="block text-gray-700 text-xs font-semibold mb-2"
          htmlFor="address"
        >
          Address
        </label>
        <textarea
          id="address"
          rows={3}
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 rounded-lg border border-zinc-300 outline-none"
        />
      </div>

      <button
        type="submit"
        className="bg-zinc-800 mt-[14px] text-base w-full md:w-[50%] text-white rounded-lg py-2 hover:bg-black duration-200 outline-none"
      >
        Add Address
      </button>
      <ToastContainer />
    </form>
  );
};

export default ShippingForm;
