import { it, vi } from "vitest";
import { render } from "@testing-library/react";
import ResultModal from "./ResultModal";

describe("ResultModal", () => {
  beforeAll(() => {
    vi.mock("./Confeti", () => ({
      default: () => <div></div>,
    }));
  });

  it("should show the modal when visible is true", () => {
    const { getByRole } = render(
      <ResultModal
        result={{ comment: "It meows", isCat: true, photoUrl: "fakeUrl" }}
        visible={true}
        onClose={vi.fn()}
      />
    );
    expect(getByRole("dialog")).toBeVisible();
  });
  it("should focus the button when modal opens", () => {
    const { getByRole } = render(
      <ResultModal
        result={{ comment: "It meows", isCat: true, photoUrl: "fakeUrl" }}
        visible={true}
        onClose={vi.fn()}
      />
    );
    expect(getByRole("button")).toHaveFocus();
  });
  it("should call on close when clicking outside the modal", () => {
    const onClose = vi.fn();
    const { getByRole } = render(
      <ResultModal
        result={{ comment: "It meows", isCat: true, photoUrl: "fakeUrl" }}
        visible={true}
        onClose={onClose}
      />
    );
    getByRole("dialog").click();
    expect(onClose).toHaveBeenCalled();
  });
  it("should call on close when pressing escape", () => {
    const onClose = vi.fn();
    render(
      <ResultModal
        result={{ comment: "It meows", isCat: true, photoUrl: "fakeUrl" }}
        visible={true}
        onClose={onClose}
      />
    );
    document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
    expect(onClose).toHaveBeenCalled();
  });
});
