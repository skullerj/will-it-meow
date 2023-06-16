import { fireEvent, render, waitFor } from "@testing-library/react";
import { it, vi } from "vitest";
import UploadButton from ".";
import { predictions, predictionsError } from "../../mocks";

describe("UploadButton", () => {
  it("renders without crashing", () => {
    render(<UploadButton onResponse={console.log} />);
  });

  it("the input should be hidden", () => {
    const { getByLabelText } = render(
      <UploadButton onResponse={console.log} />
    );
    const input = getByLabelText("Try yours !");
    expect(input).not.toBeVisible();
  });

  it("should send a request to the server when a file is selected", async (context) => {
    // setup mocks
    context.server.use(predictions);
    URL.createObjectURL = vi.fn().mockImplementation(() => "fakeUrl");

    const onResponse = vi.fn();
    const { getByLabelText, getByText, findByText } = render(
      <UploadButton onResponse={onResponse} />
    );
    const input = getByLabelText("Try yours !");
    const file = new File(["(⌐□_□)"], "chucknorris.png", {
      type: "image/png",
    });
    fireEvent.change(input, { target: { files: [file] } });

    expect(getByText("Loading...")).toBeVisible();

    await waitFor(() =>
      expect(onResponse).toHaveBeenCalledWith("cat", 0.5, "fakeUrl")
    );

    await findByText("Try yours !");
  });

  it("should show an error message when the request fails", async (context) => {
    context.server.use(predictionsError);

    const onResponse = vi.fn();
    const { getByLabelText, getByText, findByText } = render(
      <UploadButton onResponse={onResponse} />
    );
    const input = getByLabelText("Try yours !");
    const file = new File(["(⌐□_□)"], "chucknorris.png", {
      type: "image/png",
    });
    fireEvent.change(input, { target: { files: [file] } });

    expect(getByText("Loading...")).toBeVisible();

    await findByText("Try again");
  });
});
