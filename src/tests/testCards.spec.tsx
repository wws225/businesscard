import { describe, it, expect } from 'vitest';
import renderWithChakra from "./render/renderWithChakra";
import { fireEvent, screen, waitForElementToBeRemoved } from '@testing-library/react';
import "@testing-library/jest-dom";
import App from '@/App';
import { BrowserRouter } from 'react-router-dom';


describe("名刺画面", () => {

    it("それぞれの表示の確認", async () => {
        renderWithChakra( <BrowserRouter>
            <App />
            </BrowserRouter>);
        const input = screen.getByTestId("top-input")

        await fireEvent.change(input, { target: { value: "sample-id" } })
        await fireEvent.click(screen.getByTestId("top-button"));

        try {
            await screen.findByTestId("load")
            await waitForElementToBeRemoved(() => screen.getByText("loading・・・"), {
                timeout: 2000,
            });
        }
        catch{await new Promise((resolve) => setTimeout(resolve, 1000)); } 

        expect(screen.getByTestId("cards-name")).toHaveTextContent("テスト");

        expect(screen.getByTestId("cards-description")).toHaveTextContent("test");
        expect(screen.getByTestId("cards-skill")).toHaveTextContent("React");
        expect(screen.getByTestId("cards-githubIcon")).toBeInTheDocument();
        expect(screen.getByTestId("cards-qiitaIcon")).toBeInTheDocument();
        expect(screen.getByTestId("cards-xIcon")).toBeInTheDocument();
    });

    


    it("戻るボタンの確認", async () => {

        renderWithChakra( <BrowserRouter>
            <App />
            </BrowserRouter>)

        await screen.findByTestId("load")
        await waitForElementToBeRemoved(() => screen.getByText("loading・・・"), {
            timeout: 2000,
        });

        await fireEvent.click(screen.getByTestId("button-back"));
        expect(window.location.pathname).toBe("/");

    })

});
