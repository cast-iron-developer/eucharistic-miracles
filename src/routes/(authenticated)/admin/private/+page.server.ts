export const load: ({
	depends,
	locals: { supabase }
}: {
	depends: any;
	locals: { supabase: any };
}) => Promise<{
	notes: any;
}> = async ({ depends, locals: { supabase } }) => {
	depends('supabase:db:notes');
	const { data: notes } = await supabase.from('notes').select('id,note').order('id');
	return { notes: notes ?? [] };
};
