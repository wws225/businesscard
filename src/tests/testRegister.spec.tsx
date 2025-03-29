import { describe, it, expect, vi } from 'vitest'
import {  screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import renderWithChakra from './render/renderWithChakra'
import "@testing-library/jest-dom";
import App from '@/App'


const mockedNavigate = vi.fn();
// vi.mock('react-router-dom', () => ({
//   useNavigate: () => mockedNavigate
// }));
// 依存関係をモック
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

  // it('登録フォームをレンダリングする', async () => {
  //   renderComponent()
   
  //   // フォームタイトルを確認
  //   // expect( screen.getByTestId('reg-title')).toHaveTextContent('名刺新規登録')

  //   // 入力フィールドを確認
  //   expect(screen.getByText('*名前')).toBeInTheDocument()
  //   expect(screen.getByText('*自己紹介')).toBeInTheDocument()
  //   expect(screen.getByText('*好きな技術')).toBeInTheDocument()
  //   expect(screen.getByText('好きな英単語')).toBeInTheDocument()
  // })

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

    screen.debug()
    // フォーム送信
    const submitButton = screen.getByTestId('reg-button')
    await fireEvent.click(submitButton)
    await waitFor(() => {
      expect(mockedNavigate).toHaveBeenCalledWith('/');
    });
  })


  it('IDと名前と紹介文が必須であることを確認',async () => {
    renderComponent()

    
    const selectElement = screen.getByTestId('reg-select')
   await fireEvent.change(selectElement, { target: { value: "React" } });

    const submitButton = screen.getByText('登録')
    // 必須フィールドなしで送信
   await fireEvent.click(submitButton)

   expect(await screen.findByText("英単語の入力は必須です")).toBeInTheDocument()
   expect(screen.getByText("名前の入力は必須です")).toBeInTheDocument()
    expect(screen.getByText("自己紹介の入力は必須です")).toBeInTheDocument()
    // 実際のバリデーションはreact-hook-formとChakra UIの実装に依存
    // 具体的な検証方法は実装によって異なります
  })

  // it('オプションフィールドは空欄でも許容される', () => {
  //   renderComponent()

  //   // 必須フィールドのみ入力
  //   const idInput = screen.getByLabelText('好きな英単語')
  //   const nameInput = screen.getByText('*名前').nextSibling as HTMLInputElement

  //   // フレームワークを選択
  //   const selectTrigger = screen.getByText('selected skills')
  //   fireEvent.click(selectTrigger)
  //   const reactOption = screen.getByText('React')
  //   fireEvent.click(reactOption)

  //   fireEvent.change(idInput, { target: { value: 'testuser' } })
  //   fireEvent.change(nameInput, { target: { value: 'テストユーザー' } })

  //   // フォーム送信
  //   const submitButton = screen.getByText('登録')
  //   fireEvent.click(submitButton)

  //   // InsertNewCardが呼び出されたことを確認
  //   expect(InsertNewCard).toHaveBeenCalled()
  // })
})