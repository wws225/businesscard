import { describe, it, expect, vi } from 'vitest'
import { screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import renderWithChakra from './render/renderWithChakra'
import App from '@/App'
import "@testing-library/jest-dom";


const mockedNavigate = vi.fn();
vi.mock('@/supabase/InsertNewCard', () => ({
  InsertNewCard: vi.fn().mockResolvedValue(true)
}))

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-router-dom')>()
  return {
    ...actual,
    useNavigate: () => mockedNavigate
  }
})

describe('Registerコンポーネント', () => {
  const renderComponent = () => {
    return renderWithChakra(
      <MemoryRouter initialEntries={["/cards/register"]}>
        <App />
      </MemoryRouter>
    )
  }

  it('有効なデータでフォームを送信する', async () => {
    renderComponent()

    // フォームに入力
    const idInput = screen.getByTestId('reg-id')
    const nameInput = screen.getByTestId('reg-name')
    const descriptionInput = screen.getByTestId('reg-description')
    const githubIdInput = screen.getByTestId('reg-githubId')
    const qiitaIdInput = screen.getByTestId('reg-qiitaId')
    const xIdInput = screen.getByTestId('reg-xId')

    const selectElement = screen.getByTestId('reg-select')
    await fireEvent.change(selectElement, { target: { value: "React" } });
    // 入力値を設定
    await fireEvent.change(idInput, { target: { value: 'testuser' } })
    await fireEvent.change(nameInput, { target: { value: 'テストユーザー' } })
    await fireEvent.change(descriptionInput, { target: { value: 'テスト説明' } })
    await fireEvent.change(githubIdInput, { target: { value: 'testgithub' } })
    await fireEvent.change(qiitaIdInput, { target: { value: 'testqiita' } })
    await fireEvent.change(xIdInput, { target: { value: 'testx' } })

    // フォーム送信
    const submitButton = screen.getByTestId('reg-button')
    await fireEvent.click(submitButton)
    await waitFor(() => {
      expect(mockedNavigate).toHaveBeenCalledWith('/');
    });
  })

  it('IDと名前と紹介文が必須であることを確認', async () => {
    renderComponent()


    const selectElement = screen.getByTestId('reg-select')
    await fireEvent.change(selectElement, { target: { value: "React" } });

    const submitButton = screen.getByText('登録')
    // 必須フィールドなしで送信
    await fireEvent.click(submitButton)

    expect(await screen.findByText("英単語の入力は必須です")).toBeInTheDocument()
    expect(screen.getByText("名前の入力は必須です")).toBeInTheDocument()
    expect(screen.getByText("自己紹介の入力は必須です")).toBeInTheDocument()
  })

})