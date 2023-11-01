import { Button } from "@mui/material"
import { useAppThemeContext } from "./shared/contexts"

function App() {
  const { toggleTheme } = useAppThemeContext()

  return (
      <Button variant="contained" color="primary" onClick={toggleTheme}>Toggle Theme</Button>
  )
}

export default App
