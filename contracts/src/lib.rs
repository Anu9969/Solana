pub fn process_instructio(
    _program_id: &Pubkey,
    _accounts: &[AccountInfo],
    _instruction_data: &[u8],
) ->ProgramResult {
    let account : &AccountInfo<'_> = next_account_info(&mut accounts.iter())?;
    let mut counter:Counter = Counter::try_from_slice(&account.data.borrow())?;

    match CounterInstruction::try_from_slice(instruction_data)? {
        CounterInstruction::Increment(amount:u32) => {
            counter.count += amount;
            msg!("Incremented counter by {}", amount);
        }
        CounterInstruction::Decrement(amount:u32) =>{
            counter.count -= amount;
            msg!("Decremented counter by {}", amount);
        }
    }
    // Serialize the updated counter back to the account data
    counter.serialize(writer: &mut *account.data.borrow_mut())?;
    msg!("Counter updated to {}", counter.count);
    Ok(())
}