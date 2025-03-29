import { describe, it, expect } from 'vitest';
import App from '@/App';
import { fireEvent, screen } from '@testing-library/react';
import "@testing-library/jest-dom";
import renderWithChakra from './render/renderWithChakra';
import { BrowserRouter } from 'react-router-dom';

describe("top画面", () => {

  renderWithChakra( <BrowserRouter>
    <App />
    </BrowserRouter>);

  it("topのタイトルが表示されている", () => {
    expect(screen.getByTestId("title")).toHaveTextContent("デジタル名刺アプリ");

  });

  it("入力なしでボタンをクリックするとerror表示", async () => {
    renderWithChakra( <BrowserRouter>
      <App />
      </BrowserRouter>);
    // 🔹 ボタンをクリック
    await fireEvent.click(screen.getByTestId("top-button"));
    const element = await screen.findByText("IDを入力してください")
    expect(element).toBeInTheDocument();
  });

  it("ボタンをクリックするとcardページに遷移", async () => {
    renderWithChakra( <BrowserRouter>
      <App />
      </BrowserRouter>);
    const input = screen.getByTestId("top-input")

    await fireEvent.change(input, { target: { value: "sample-id" } })
    // 🔹 ボタンをクリック
    await fireEvent.click(screen.getByTestId("top-button"));

    await screen.findByText("loading・・・")

    expect(window.location.pathname).toBe("/cards/sample-id");

  });

});
