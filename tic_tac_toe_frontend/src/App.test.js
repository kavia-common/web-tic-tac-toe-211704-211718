import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders retro tic tac toe title", () => {
  render(<App />);
  const title = screen.getByText(/retro tic tac toe/i);
  expect(title).toBeInTheDocument();
});
