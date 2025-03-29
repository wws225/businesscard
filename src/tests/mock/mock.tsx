//モックの宣言
jest.mock("@/utils/supabase", () => ({
    supabase: {
      from: jest.fn(),
    },
  }));
  