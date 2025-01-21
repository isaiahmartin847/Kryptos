import React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import State from "@/types/state";
import Species from "@/types/species";
import HuntingUnit from "@/types/huntingUnit";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";

interface CreateSessionFormValues {
  State: string;
  Species: string;
  HuntingUnit: string;
}

const fetchStates = async (): Promise<State[]> => {
  const response = await fetch(`${API_BASE_URL}/states`);
  if (!response.ok) throw new Error("Failed to fetch states");
  return response.json();
};

const fetchSpeciesByStateID = async (stateID: string): Promise<Species[]> => {
  const response = await fetch(`${API_BASE_URL}/species?stateID=${stateID}`);
  if (!response.ok) throw new Error("Failed to fetch species");
  return response.json();
};

const fetchHuntingUnitBySpeciesID = async (
  speciesID: string
): Promise<HuntingUnit[]> => {
  const response = await fetch(
    `${API_BASE_URL}/hunting-units?speciesID=${speciesID}`
  );
  if (!response.ok) throw new Error("Failed to fetch hunting units");
  return response.json();
};

const CreateSession = () => {
  const form = useForm<CreateSessionFormValues>({
    defaultValues: {
      State: "",
      Species: "",
      HuntingUnit: "",
    },
  });

  const stateID = form.watch("State");
  const speciesID = form.watch("Species");

  const {
    data: states,
    isLoading: isStatesLoading,
    isError: isStatesError,
    refetch: refetchStates,
  } = useQuery({
    queryKey: ["states"],
    queryFn: fetchStates,
  });

  const {
    data: species,
    isLoading: isSpeciesLoading,
    isError: isSpeciesError,
    refetch: refetchSpecies,
  } = useQuery<Species[], Error>({
    queryKey: ["species", stateID],
    queryFn: () => fetchSpeciesByStateID(stateID),
    enabled: !!stateID,
  });

  const {
    data: units,
    isLoading: isUnitsLoading,
    isError: isUnitError,
    refetch: refetchUnits,
  } = useQuery<HuntingUnit[], Error>({
    queryKey: ["huntingUnits", speciesID],
    queryFn: () => fetchHuntingUnitBySpeciesID(speciesID),
    enabled: !!speciesID,
  });

  const onSubmit = (values: CreateSessionFormValues) => {
    console.group("Form Submission Data");
    console.log(values);
    console.groupEnd();
    alert("Form submitted successfully!");
  };

  const renderError = () => (
    <div>
      <h1>Error Occurred</h1>
      {isStatesError && <p>State Error: Failed to fetch states.</p>}
      {isSpeciesError && <p>Species Error: Failed to fetch species.</p>}
      {isUnitError && <p>Unit Error: Failed to fetch units.</p>}
      <Button
        onClick={() => {
          refetchStates();
          refetchSpecies();
          refetchUnits();
        }}>
        Retry
      </Button>
    </div>
  );

  if (isStatesError || isSpeciesError || isUnitError) return renderError();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4">
        <FormField
          control={form.control}
          name="State"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select a state</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}>
                  <SelectTrigger>
                    {isStatesLoading ? (
                      <div className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Loading states...</span>
                      </div>
                    ) : (
                      <SelectValue placeholder="Select a State" />
                    )}
                  </SelectTrigger>
                  <SelectContent>
                    {states?.map((state) => (
                      <SelectItem
                        key={state.ID}
                        value={state.ID.toString()}>
                        {state.FullName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Species Field */}
        <FormField
          control={form.control}
          name="Species"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select a species</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a Species" />
                  </SelectTrigger>
                  <SelectContent>
                    {/* Assuming species data is available */}
                    {species?.map((speciesItem) => (
                      <SelectItem
                        key={speciesItem.ID}
                        value={speciesItem.ID.toString()}>
                        {speciesItem.Name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Hunting Unit Field */}
        <FormField
          control={form.control}
          name="HuntingUnit"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select a hunting unit</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a Hunting Unit" />
                  </SelectTrigger>
                  <SelectContent>
                    {/* Assuming hunting unit data is available */}
                    {units?.map((unit) => (
                      <SelectItem
                        key={unit.ID}
                        value={unit.ID.toString()}>
                        {unit.Name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          variant="secondary"
          disabled={
            !form.watch("State") ||
            !form.watch("Species") ||
            !form.watch("HuntingUnit")
          }>
          Create
        </Button>
      </form>
    </Form>
  );
};

export default CreateSession;
