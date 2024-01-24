import { useCallback, useState } from 'react';

export const useToggle = (initialValue = false):[boolean,<T,>
		(value?: boolean | T)=>void] => {
  const [isActive, setIsActive] = useState(initialValue);
  const handleToggle = useCallback(<T,>
		(value?: boolean | T) =>
			setIsActive(typeof value === 'boolean' ? value : !isActive),
		[isActive]
  );
  return [isActive,handleToggle];
}
