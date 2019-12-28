import $app from '$app'
import './dbConnection'

const port = process.env.PORT || 3000
$app.listen(port, () => {
    console.log(`Server working at http://localhost:${port}`)
})
