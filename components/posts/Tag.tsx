interface TagProps {
  name: string 
}
const Tag:React.FC<TagProps> = (props) => {
  return (
    <div className="w-fit h-fit px-2 py-1 bg-gray-300 rounded-lg text-sm dark:bg-dark-secondary">
      {props.name}
    </div>
  )

}
export default Tag;