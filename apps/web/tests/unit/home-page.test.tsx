import { render, screen } from "@testing-library/react";

import HomePage from "@/app/page";

describe("HomePage", () => {
  it("highlights the value proposition", () => {
    render(<HomePage />);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Stop guessing channels"
    );
    expect(
      screen.getByText(/Spreesy analyzes your products/i)
    ).toBeInTheDocument();
  });
});
