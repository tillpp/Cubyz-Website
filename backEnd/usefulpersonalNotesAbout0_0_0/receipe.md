{
    input:ItemStack[] = parseReceipeItem[]
    output:ItemStack = parseReceipeItem
    
    #parseReceipeItem:
        (trimmed of whitespace)
            syntax either "itemId" or "u16 <whitespace> itemId"
                ItemStack amount default to = 1  
    
}[]