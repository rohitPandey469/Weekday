export const EnginneringOptions = [
  { value: "ocean", label: "Ocean", color: "#00B8D9", isFixed: true },
  { value: "blue", label: "Blue", color: "#0052CC", isDisabled: true },
  { value: "purple", label: "Purple", color: "#5243AA" },
  { value: "red", label: "Red", color: "#FF5630", isFixed: true },
  { value: "orange", label: "Orange", color: "#FF8B00" },
  { value: "yellow", label: "Yellow", color: "#FFC400" },
  { value: "green", label: "Green", color: "#36B37E" },
  { value: "forest", label: "Forest", color: "#00875A" },
  { value: "slate", label: "Slate", color: "#253858" },
  { value: "silver", label: "Silver", color: "#666666" },
];

export const DesignOptions = [
  { value: "vanilla", label: "Vanilla", rating: "safe" },
  { value: "chocolate", label: "Chocolate", rating: "good" },
  { value: "strawberry", label: "Strawberry", rating: "wild" },
  { value: "salted-caramel", label: "Salted Caramel", rating: "crazy" },
];

export const OperationsOptions = [
  { value: "vanilla", label: "Vanilla", rating: "safe" },
  { value: "chocolate", label: "Chocolate", rating: "good" },
  { value: "strawberry", label: "Strawberry", rating: "wild" },
  { value: "salted-caramel", label: "Salted Caramel", rating: "crazy" },
];

export const GroupedOptionsForRoles = [
  {
    label: "Enginnering",
    options: EnginneringOptions,
  },
  {
    label: "Design",
    options: DesignOptions,
  },
  {
    labels: "Operations",
    options: OperationsOptions,
  },
];

export const OptionsForExp = [
  { value: 2, label: "1-2 years" },
  { value: 5, label: "2-5 years" },
  { value: 10, label: "5-10 years or 10+" },
];

export const OptionsForLocation = [
  { value: "new_york", label: "New York" },
  { value: "los_angeles", label: "Los Angeles" },
  { value: "chicago", label: "Chicago" },
  { value: "london", label: "London" },
  { value: "paris", label: "Paris" },
  { value: "tokyo", label: "Tokyo" },
];

export const OptionsForPay = [
  { value: 0, label: "0L" },
  { value: 10, label: "10L" },
  { value: 20, label: "20L" },
  { value: 30, label: "30L" },
];

export const OptionsForRemote = [
  { value: "remote", label: "Remote" },
  { value: "Hybrid", label: "Hybrid" },
  { value: "In Office", label: "In Office" },
];

export const OptionsForStack = [
  { value: "MERN", label: "MERN" },
  { value: "MEAN", label: "MEAN" },
];
